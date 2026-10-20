CREATE TABLE `consultation_requests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`submissionId` varchar(36) NOT NULL,
	`firstName` varchar(80) NOT NULL,
	`lastName` varchar(80) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(40) NOT NULL,
	`location` varchar(20) NOT NULL,
	`objective` varchar(120),
	`message` text,
	`contactConsent` int NOT NULL,
	`status` enum('new','contacted','closed') NOT NULL DEFAULT 'new',
	`createdAt` bigint NOT NULL,
	CONSTRAINT `consultation_requests_id` PRIMARY KEY(`id`),
	CONSTRAINT `consultation_requests_submissionId_unique` UNIQUE(`submissionId`)
);
--> statement-breakpoint
CREATE TABLE `marketing_events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`eventId` varchar(36) NOT NULL,
	`visitorId` varchar(36) NOT NULL,
	`visitId` varchar(36) NOT NULL,
	`name` varchar(50) NOT NULL,
	`page` varchar(80) NOT NULL,
	`device` varchar(12) NOT NULL,
	`source` varchar(16) NOT NULL,
	`campaign` varchar(60) NOT NULL DEFAULT '',
	`service` varchar(20),
	`placement` varchar(20),
	`video` varchar(20),
	`step` int,
	`occurredAt` bigint NOT NULL,
	CONSTRAINT `marketing_events_id` PRIMARY KEY(`id`),
	CONSTRAINT `marketing_events_eventId_unique` UNIQUE(`eventId`)
);
--> statement-breakpoint
CREATE TABLE `marketing_purchases` (
	`id` int AUTO_INCREMENT NOT NULL,
	`purchaseHash` varchar(64) NOT NULL,
	`amountCents` int NOT NULL,
	`currency` varchar(3) NOT NULL,
	`product` varchar(30) NOT NULL,
	`occurredAt` bigint NOT NULL,
	CONSTRAINT `marketing_purchases_id` PRIMARY KEY(`id`),
	CONSTRAINT `marketing_purchases_purchaseHash_unique` UNIQUE(`purchaseHash`)
);
--> statement-breakpoint
CREATE INDEX `consultation_requests_time` ON `consultation_requests` (`createdAt`);--> statement-breakpoint
CREATE INDEX `marketing_events_time` ON `marketing_events` (`occurredAt`);--> statement-breakpoint
CREATE INDEX `marketing_events_visit` ON `marketing_events` (`visitId`);--> statement-breakpoint
CREATE INDEX `marketing_purchases_time` ON `marketing_purchases` (`occurredAt`);