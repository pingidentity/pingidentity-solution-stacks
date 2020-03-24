## Docker Compose deployment

### Pre-Requisites
* [Docker](https://www.docker.com/get-started)
* [Docker-Compose](https://docs.docker.com/compose/install/)
* [Ping DevOps - Compose](https://pingidentity-devops.gitbook.io/devops/deploy/deploycompose)

### Configuration
* Copy the `docker-compose.yaml`, `env_vars` and `postman_vars.json` files to a folder
* Modify the `env_vars` file to match your environment
* Modify the `postman.json` file to match your environment
* Launch the stack with `docker-compose up -d`
* Logs for the stack can be watched with `docker-compose logs -f`
* Logs for individual services can be watched with `docker-compose logs -f {service}`

### Configuration Variables
Variables defined in `postman_vars.json` will override the Collection defaults

**Collection Defaults**
| Variable | Description | Default |
| -------- | ----------- | ------- |
| `pfAdminURL` | PingFed Administration URL | https://pingfederate:9999 |
| `pdAdminUrl` | PingDir Administration URL | https://pingdirectory:443 |
| `pfAdmin` | PingFed API Admin Account | `api-admin` |
| `pfAdminPwd` | PingFed API Admin Password| {{globalPwd}} |
| `pdAdmin` | PingFed Admin Account | `cn=dmanager` |
| `pdAdminPwd` | PingDir Admin Password| {{globalPwd}} |
| `pdsAdmin` | PingDataSync Admin Account | `cn=administrator` |
| `pdsAdminPwd`  | PingDataSync Admin Password | {{globalPwd}} |
| `oauthSecret` | PingLogon Client Secret | {{globalPwd}} |
| `globalPwd` | Global Password | 2FederateM0re |
| `adDsServiceAccount` | PingFed AD Service Account | `pingfederate` |
| `adServicePwd` | PingFed AD Service Password | P@ssword99 |

**Compose - `postman_vars.json`**  
| Variable | Description | Customer Values |
| -------- | ----------- | ------- |
| `pfBaseURL` | PingFed Runtime URL | https://{{your PF public FQDN}}:9031 |
| `pingId` | PingID SDK Properties  | Your SDK Properties file |
| `adDcHost` | AD Domain Controller | Your AD Domain Controller |
| `adBaseDN` | AD Base DN | Your AD Base DN |
| `pingCentralHost` | PingCentral Host (CORS setting) | Your PingCentral Host |

**`env_vars`**
| Variable | Description | Customer Values |
| -------- | ----------- | ------- |
| `PING_IDENTITY_ACCEPT_EULA` | Ping Identity EULA | YES |
| `PF_LOG_LEVEL` | PingFed Logging Level | INFO or DEBUG |
| `USER_BASE_DN` | Root of the LDAP tree | dc=example.com |
| `PF_USER_PWD` | Password for PF Service Account | `pfAdminPwd` |
| `AD_DC_HOST` | Domain Controller | {{Your Domain Controller}} |
| `AD_BASE_DN` | Your AD Base DN | dc=example.dc=com |
| `PING_CENTRAL_BLIND_TRUST` | Allow Blind Trust | `true` / `false` |
| `PING_CENTRAL_VERIFY_HOSTNAME` | Verify SSL Hostname | `true` / `false` |
| `MYSQL_USER` | PingCentral MySQL User | `root` |
| `MYSQL_PASSWORD` | PingCentral MySQL Password| `2Federate` |
| `PING_CENTRAL_OIDC_ENABLED` | PingCentral OIDC AuthN | `true` / `false` |
| `PING_CENTRAL_CLIENT_ID` | PingCentral OIDC Client | PingCentral |
| `PING_CENTRAL_CLIENT_SECRET` | PingCentral OIDC Client Secret | 2FederateM0re |
| `PF_ISSUER` | PingFed OIDC Issuer | {{Your PF Issuer}} |