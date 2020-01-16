# Ping Identity Solution Profiles

The solution profiles address specific use cases for the Ping Identity products delivered in a Docker stack. These solution profile stacks include working, preconfigured images of products designed to interoperate with each other. You can also customize a solution stack as needed. This gives you a streamlined way to test and demonstrate Ping Identity solutions to the platform requirements for your organization.

Currently, these solution profiles are available:

  * **Workforce**

    The Workforce solution profile is an authentication authority solution for the workforce use case, using PingOne for Enterprise, PingID, PingFederate, PingDirectory, and Microsoft Active Directory. The PingFederate and PingDirectory images are preconfigured. Two dummy (stubbed) applications are preconfigured in PingFederate for testing SSO. You'll need to manually configure the PingOne for Enterprise connection to PingFederate.

  * **Customer**

    The Customer solution profile is a baseline authentication authority solution for the customer use case, using PingFederate, PingAccess, PingDirectory, PingDataSync, PingDataGovernance, and PingDataSync. PingID SDK Adapters are available but not configured.

See [Get started](docs/getStarted.md) to set up the DevOps environment needed to run any of our solution profiles.
