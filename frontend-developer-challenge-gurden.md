# Frequenz: Frontend Interview Technical Task

## Briefing

In this task, you will build a UI that lets the user browse repositories on GitHub.  
You will demonstrate your ability to implement forms, data fetching, and tabular data presentation.

The choice of frameworks and tools is completely up to you unless your interviewer has requested specifics.  
This is intended to be a collegial exercise. Please conduct yourself as you would in a regular work day.

## Evaluation Criteria

### User experience

The UI will be judged on the following criteria

- compliance: it offers the features and behavior as specified in the requirements.  
- stability: it works without bugs  
- good UX bedside manners:  
  - Handle input validation errors gracefully, so that the user knows what needs to be done to resolve the issue.  
  - Handle remote failures gracefully, distinguishing the best you can network errors from other unexpected errors. (It's okay to treat errors owing to GitHub API rate limitation as unexpected)

For the sake of limiting the complexity and scope for the homework, the UI will NOT be judged based on these aspects so do not worry about these.

- Responsiveness and mobile friendliness  
- Accessibility issues  
- Internalizationalization/Localization

### Code

The codebase will be judged on the following criteria

- Readability and logical clarity (including commenting where deemed appropriate)  
- Sensible separation of concerns  
- Use of modern patterns, standards and APIs  
- Reusability potential of UI components

**We are not expecting tests.** This challenge is more about your technical ability in developing a product at pace while reflecting sensible complexity management through the code. If you are successful in this challenge, you will have your chance to demonstrate your knowledge and experience in software development practices.

## Requirements

You are free to improvise on anything that is not specified. Use your intuition on sensible UX to fill the gap.

### Composition

- An required input to choose a GitHub organization, with autocompletion.  
- An optional text input to filter repository names.  
- A pair of optional numeric input to filter repository by the minimum/maximum number of open issues. Both fields are optional but the minimum must be lower than the maximum.  
- A paginated table showing data from the repository:  
  - Name  
  - Number of open issues  
  - Number of stars

### Behavior

- An organization must be chosen before the remaining of the form is displayed.  
- Changing the organization should still preserve the repository filters.  
- As long as the entire form is valid, tweaking repository filters should result in an automatic re-fetch of the repository list.  
- Refuse to update if the form has invalid content until it becomes valid.  
- Don't use a submit button for the filters (since the update is automatic), but *do* provide a way to retry explicitly if the fetch fails.  
- Loading states should be presented.

## Submission

- Provide the code in a publicly accessible github repository  
- Provide the application through public hosting, such as Netlify or Vercel  
- Use the following code as the project name for both the hosted solution and the github repository (4672657175656E7A2047757264656E2054657374)  
- Be sure to include a `README` file listing the steps required to launch the UI  
- Include any details on decisions you made if you feel further clarity is needed

## Resources

- Github public API reference: [https://docs.github.com/en/rest/reference](https://docs.github.com/en/rest/reference)

