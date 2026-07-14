CREATE TABLE `programme_enrollment` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`programmeSlug` varchar(100) NOT NULL DEFAULT 'on-rstart-la-machine',
	`startedAt` timestamp NOT NULL DEFAULT (now()),
	`currentModule` int NOT NULL DEFAULT 1,
	`totalXp` int NOT NULL DEFAULT 0,
	`streak` int NOT NULL DEFAULT 0,
	`level` varchar(50) NOT NULL DEFAULT 'Débutant',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `programme_enrollment_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `programme_progress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`moduleId` int NOT NULL,
	`completed` int NOT NULL DEFAULT 0,
	`completedAt` timestamp,
	`checkinData` json,
	`xpEarned` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `programme_progress_id` PRIMARY KEY(`id`)
);
