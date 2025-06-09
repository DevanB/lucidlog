### Focus

- Build privacy policy page
- Build terms of service/use page
- Cleanup pricing section
- Build pricing page
- Review [metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadata-fields)
  - `npx check-site-meta localhost:3000`
- Add robots.txt
- Add webmanifest

### Backlog

- Review Clerk [middleware docs](https://clerk.com/docs/references/nextjs/clerk-middleware#protect-all-routes)
- Review Clerk [custom redirects docs](https://clerk.com/docs/guides/custom-redirects)
- Build custom user menu
  - <https://clerk.com/blog/create-custom-user-menu-radix>
  - Beekeeply nav-user, use-initials
  - <https://clerk.com/docs/references/javascript/user>
  - <https://github.com/KairuDeibisu/ShadcnClerkUserButton/tree/main>
  - <https://github.com/shadcn-ui/ui/issues/5462>
  - <https://github.com/stormynight9/clerk-shadcn-theme>
  - <https://www.reddit.com/r/nextjs/comments/1c0ibnx/i_made_a_clerk_theme_that_syncs_with_your/>
- Setup and use Clerk Elements for login, register, and waitlist
- Add onboarding flow (<https://clerk.com/docs/references/nextjs/add-onboarding-flow>)

### Future Improvements

- Migrate from Clerk to better-auth
  - <https://www.better-auth.com/docs/guides/clerk-migration-guide>
  - <https://www.youtube.com/watch?v=Za_QihbDSuk>
  - Migrate from Clerk Billing to polar.sh better-auth integration
