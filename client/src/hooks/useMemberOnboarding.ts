import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import {
  demoMemberAnswers,
  emptyMemberAnswers,
  memberAnswersSchema,
  type MemberAnswers,
  type MemberProduct,
} from "@shared/memberOnboarding";

export function useMemberOnboarding(product: MemberProduct) {
  const isDemo =
    new URLSearchParams(window.location.search).get("apercu") === "1";
  const auth = trpc.auth.me.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });
  const isAuthenticated = Boolean(auth.data);
  const utils = trpc.useUtils();
  const record = trpc.member.getOnboarding.useQuery(
    { product, accountCacheKey: String(auth.data?.id || "anonymous") },
    { enabled: isAuthenticated && !isDemo, retry: false }
  );
  const mutation = trpc.member.saveOnboarding.useMutation();
  const [answers, setAnswers] = useState<MemberAnswers>(
    isDemo ? demoMemberAnswers() : emptyMemberAnswers()
  );
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<
    "draft" | "needs_review" | "referred" | null
  >(null);
  useEffect(() => {
    if (isDemo) {
      try {
        const raw = sessionStorage.getItem(`adm-demo-onboarding-${product}`);
        if (raw) {
          const data = JSON.parse(raw);
          setAnswers(memberAnswersSchema.parse(data.answers));
          setStep(Math.max(0, Math.min(5, Number(data.step) || 0)));
          setStatus(data.status || null);
        }
      } catch {
        /* Reset to the known fictitious profile if the demo draft is invalid. */
      }
    } else if (!auth.isLoading && !record.isLoading && !record.data) {
      setAnswers(emptyMemberAnswers());
      setStep(0);
      setStatus(null);
    } else if (record.data) {
      const parsed = memberAnswersSchema.safeParse(record.data.answers);
      if (parsed.success) setAnswers(parsed.data);
      setStep(record.data.step);
      setStatus(record.data.status);
    }
  }, [
    product,
    isDemo,
    record.data,
    record.isLoading,
    auth.isLoading,
    auth.data?.id,
  ]);
  const save = async (
    nextAnswers: MemberAnswers,
    nextStep: number,
    submit = false
  ) => {
    if (isDemo) {
      const nextStatus = submit ? "needs_review" : "draft";
      sessionStorage.setItem(
        `adm-demo-onboarding-${product}`,
        JSON.stringify({
          answers: nextAnswers,
          step: nextStep,
          status: nextStatus,
        })
      );
      setAnswers(nextAnswers);
      setStep(nextStep);
      setStatus(nextStatus);
      return;
    }
    const result = await mutation.mutateAsync({
      product,
      answers: nextAnswers,
      step: nextStep,
      submit,
    });
    setAnswers(nextAnswers);
    setStep(nextStep);
    setStatus(result.status);
    await utils.member.getOnboarding.invalidate({ product });
  };
  return {
    answers,
    step,
    status,
    isDemo,
    isAuthenticated,
    loading: auth.isLoading || (!isDemo && isAuthenticated && record.isLoading),
    error: auth.error || record.error,
    saving: mutation.isPending,
    save,
    user: auth.data,
  };
}
