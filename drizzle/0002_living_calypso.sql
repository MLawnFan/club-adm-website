CREATE TABLE `member_onboarding` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`product` enum('rstart','starter') NOT NULL,
	`answers` json NOT NULL,
	`step` int NOT NULL DEFAULT 0,
	`status` enum('draft','needs_review','referred') NOT NULL DEFAULT 'draft',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `member_onboarding_id` PRIMARY KEY(`id`),
	CONSTRAINT `member_onboarding_user_product` UNIQUE(`userId`,`product`)
);
