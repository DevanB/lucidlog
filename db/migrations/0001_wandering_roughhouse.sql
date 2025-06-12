CREATE INDEX `related_terms_term_id_idx` ON `related_terms` (`term_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `related_terms_unique_pair` ON `related_terms` (`term_id`,`related_term_id`);