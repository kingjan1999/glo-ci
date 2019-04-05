<template>
  <div class="how-to">
    <h1>How to use Glo CI</h1>
    <h3>Get Started</h3>
    <p>
      Although this application aims at a high degree of automation of all
      required steps, a little manual work remains necessary for a complete
      integration of the services. Start by logging in here with GitKraken and
      continue with the instructions for the desired CI provider (Gitlab /
      Travis).
    </p>
    <h3 id="travis">Travis</h3>
    <em
      >Note: The following instructions are for the Travis Pro version
      (travis-ci.com), but they should work similarly for travis-ci.org</em
    >
    <h4 id="travistoken">1. Get an API Token</h4>
    <p>
      You need to provide Glo CI with an Travis API Token if you wish to use
      Travis CI. You can get one on your
      <a href="https://travis-ci.com/profile" title="Travis Profile"
        >Travis CI Profile page</a
      >
      or using the command line:
      <code>travis token --com</code>
    </p>
    <h4>2. Create an integration</h4>
    <p>
      You can now add a
      <router-link to="/add" title="Add a new integration"
        >new integration</router-link
      >&nbsp; (using the link or go to Manage &rarr; Add new). Provide all the
      necessary details, including the Travis API token generated above.
    </p>
    <h4>3. Set up GitKraken webhook</h4>
    <p>
      Using the webhook url and secret you've just got from the add dialog, you
      can now
      <a
        href="https://support.gitkraken.com/developers/webhooks/set-up/"
        title="Instruction for setting up a webhook for Glo"
        >set up a new webhook</a
      >
      for your Glo board. Please select at least the &quot;Card&quot; trigger.
    </p>
    <h4>4. Set up travis webhook</h4>
    <p>
      Using the webhook url you've got from the Glo CI, you can now
      <a
        href="https://docs.travis-ci.com/user/notifications/#configuring-webhook-notifications"
        title="Configuring webhook notifications for Travis"
        >create a new webhook</a
      >
      with travis.
    </p>
    <h3 id="gitlab">GitLab</h3>
    <h4 id="gitlabtoken">1. Get an trigger token and your project id</h4>
    <p>
      Create a new trigger on the CI / CD configuration page of your GitLab
      project (as described
      <a
        href="https://docs.gitlab.com/ce/ci/triggers/#adding-a-new-trigger"
        title="Adding a new trigger"
        >here</a
      >). Please note both the token and the project id returned by GitLab. You
      can find the project ID in the example urls. For example, if the example
      url is
      <em>
        https://gitlab.example.com/api/v4/projects/
        <strong>1234</strong>/trigger/pipeline </em
      >, your project ID is 1234.
    </p>
    <h4>2. Create an integration</h4>
    <p>
      You can now add a
      <router-link to="/add" title="Add a new integration"
        >new integration</router-link
      >&nbsp; (using the link or go to Manage &rarr; Add new). Provide all the
      necessary details, including the details from above.
    </p>
    <h4>3. Set up GitKraken webhook</h4>
    <p>
      Using the webhook url and secret you've just got from the add dialog, you
      can now
      <a
        href="https://support.gitkraken.com/developers/webhooks/set-up/"
        title="Instruction for setting up a webhook for Glo"
        >set up a new webhook</a
      >
      for your Glo board. Please select at least the &quot;Card&quot; trigger.
    </p>
    <h4>4. Set up GitLab webhook</h4>
    <p>
      Using the webhook url and secret you've got from the Glo CI, you can now
      <a
        href="https://docs.gitlab.com/ce/user/project/integrations/webhooks.html#overview"
        title="Configuring webhook notifications for GitLab"
        >create a new webhook</a
      >
      with GitLab. Please activate only Pipeline and Build events
    </p>
  </div>
</template>
