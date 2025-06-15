ALTER TABLE `dictionary_terms` ADD `slug` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `dictionary_terms_slug_unique` ON `dictionary_terms` (`slug`);