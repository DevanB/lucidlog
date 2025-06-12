CREATE TABLE `dictionary_terms` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`definition` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `dictionary_terms_name_unique` ON `dictionary_terms` (`name`);--> statement-breakpoint
CREATE TABLE `related_terms` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`term_id` integer NOT NULL,
	`related_term_id` integer NOT NULL
);
