const getPreparationRequirements = (pentestType) => {
  const baseRequirements = {
    scope: [],
    documentation: [
      '• Teknisk dokumentasjon (Confluence, GitHub README, arkitekturdiagrammer)',
      '• Lenker til relevante repositories',
      '• Beskrivelse av applikasjonens arkitektur'
    ],
    access: []
  };

  switch (pentestType) {
    case 'web_app':
    case 'api':
      baseRequirements.scope = [
        '• Komplette URL-er til alle miljøer (dev, test, staging, prod)',
        '• API-endepunkter (inkl. Swagger/OpenAPI-dokumentasjon hvis tilgjengelig)',
        '• Oversikt over hvilke sider/funksjonalitet som skal testes',
        '• Tydelig avgrensning: Hva inngår og hva inngår IKKE?',
        '• Eksempler på viktige brukerreiser'
      ];
      baseRequirements.access = [
        '• Testbrukere for alle relevante roller (admin, bruker, osv.)',
        '• API-nøkler/clients for testing hvis aktuelt',
        '• Testdata tilgjengelig i testmiljø',
        '• Informasjon om autentiseringsmetode',
        '• Ved bruk av Maskinporten: Vi har syntetiske organisasjoner, 313575551 og 314573528',
        '• IP-whitelist/VPN-krav hvis relevant'
      ];
      break;

    case 'mobile_app':
      baseRequirements.scope = [
        '• Plattform(er): iOS, Android eller begge',
        '• Installasjonsfiler eller TestFlight/Google Play beta-lenker',
        '• Oversikt over funksjonalitet som skal testes',
        '• Backend API-endepunkter hvis relevant'
      ];
      baseRequirements.access = [
        '• Testbrukere med ulike roller',
        '• Testdata i testmiljø',
        '• Informasjon om hvordan appen autentiserer',
        '• Backend API-tilganger hvis nødvendig'
      ];
      break;

    case 'network':
      baseRequirements.scope = [
        '• IP-adresser/subnett som skal testes',
        '• Nettverkstopologi/diagram',
        '• Tydelig avgrensning av testområde',
        '• Hvilke systemer/tjenester som kjører'
      ];
      baseRequirements.access = [
        '• VPN-tilgang til nettverket hvis nødvendig',
        '• IP-whitelist for testverktøy',
        '• Koordinering med drift/NOC',
        '• Varslingsprosedyrer'
      ];
      break;

    case 'cloud':
      baseRequirements.scope = [
        '• Skyplattform (Azure, AWS, GCP, etc.)',
        '• Ressurser/tjenester som skal testes',
        '• Arkitekturdiagrammer',
        '• Tydelig avgrensning av testområde'
      ];
      baseRequirements.access = [
        '• Tilganger til skyplattform (read-only eller begrenset)',
        '• Informasjon om IAM/RBAC-oppsett',
        '• Testmiljø separert fra produksjon',
        '• Kontaktperson med sky-tilganger'
      ];
      break;

    default:
      baseRequirements.scope = [
        '• Detaljert beskrivelse av hva som skal testes',
        '• URL-er, endepunkter eller systemer',
        '• Tydelig avgrensning: Hva inngår og hva inngår IKKE?',
        '• Eksempler på viktige brukerreiser/bruksmønstre'
      ];
      baseRequirements.access = [
        '• Testbrukere for alle relevante roller',
        '• Testdata tilgjengelig i testmiljø',
        '• API-nøkler/clients hvis relevant',
        '• Informasjon om tilgangsstyring og autentisering'
      ];
  }

  return baseRequirements;
};

const getPreparationTemplate = (pentestType) => {
  const templates = {
    web_app: `## Scope
**URL-er til testmiljøer:**
- Dev: 
- Test: 
- Staging: 
- Prod (hvis aktuelt): 

**API-endepunkter:**
- Swagger/OpenAPI: 
- Base URL: 

**Hva inngår i testen:**
- 

**Hva inngår IKKE:**
- 

**Viktige brukerreiser:**
1. 
2. 

## DOKUMENTASJON
**Teknisk dokumentasjon:**
- Confluence: 
- GitHub: 
- Annet: 

**Arkitektur:**
- 

## TILGANGER
**Testbrukere (brukernavn, ikke passord!):**
- Admin: 
- Vanlig bruker: 
- Andre roller: 
- Dolly syntetiske brukere: [Bruker dere Dolly? Hvilke testpersoner skal vi bruke?]
- IDA-testidenter: [Har dere egne IDA-identer? Hvilke skal vi bruke?]

**Autentisering:**
- Type (OAuth, Maskinporten, etc.): 
- Maskinporten: [Trenger dere dette? Vi har syntetiske org.nr.]

**API-tilganger:**
- API-nøkler/clients: [Hvordan får vi dette?]

**Nettverk:**
- IP-whitelist nødvendig? 
- VPN-tilgang? 

**Testdata:**
- Finnes i miljø: 
- Må opprettes: `,

    api: `## Scope
**API-endepunkter:**
- Swagger/OpenAPI: 
- Base URL: 
- Hvilke endepunkter skal testes: 

**Hva inngår IKKE:**
- 

## DOKUMENTASJON
**Teknisk dokumentasjon:**
- Confluence: 
- GitHub: 
- API-dokumentasjon: 

**Arkitektur:**
- 

## TILGANGER
**Autentisering:**
- Type (OAuth, Maskinporten, API keys, etc.): 
- Maskinporten: [Trenger dere dette? Vi har syntetiske org.nr.]

**API-tilganger:**
- API-nøkler/clients: [Hvordan får vi dette?]
- Testbrukere med ulike roller hvis aktuelt: 
- Dolly syntetiske brukere: [Bruker dere Dolly? Hvilke testpersoner skal vi bruke?]
- IDA-testidenter: [Har dere egne IDA-identer? Hvilke skal vi bruke?]

**Testdata:**
- Finnes i miljø: 
- Må opprettes: `,

    mobile_app: `## Scope
**Plattform:**
- [ ] iOS
- [ ] Android

**App-tilgang:**
- TestFlight/beta-lenke: 
- Eller installasjonsfiler: 

**Funksjonalitet som skal testes:**
- 

**Backend API:**
- Endepunkter: 
- Swagger: 

## DOKUMENTASJON
**Teknisk dokumentasjon:**
- Confluence: 
- GitHub: 

**Arkitektur:**
- 

## TILGANGER
**Testbrukere:**
- Bruker 1: 
- Bruker 2: 
- Dolly syntetiske brukere: [Bruker dere Dolly? Hvilke testpersoner skal vi bruke?]
- IDA-testidenter: [Har dere egne IDA-identer? Hvilke skal vi bruke?]

**Backend API-tilganger:**
- 

**Testdata:**
- `,

    network: `## Scope
**IP-adresser/subnett:**
- 

**Nettverkstopologi:**
- Diagram: 
- Beskrivelse: 

**Systemer/tjenester:**
- 

**Hva inngår IKKE:**
- 

## DOKUMENTASJON
**Nettverksdokumentasjon:**
- Confluence: 
- Diagrammer: 

## TILGANGER
**VPN-tilgang:**
- Nødvendig? 
- Hvordan får vi tilgang: 

**IP-whitelist:**
- Våre test-IPer må whitelistes: 

**Koordinering:**
- Kontakt drift/NOC: 
- Varslingsprosedyrer: `,

    cloud: `## Scope
**Skyplattform:**
- [ ] Azure
- [ ] AWS
- [ ] GCP
- [ ] Annet: 

**Ressurser/tjenester som skal testes:**
- 

**Hva inngår IKKE:**
- 

## DOKUMENTASJON
**Arkitektur:**
- Diagrammer: 
- Confluence: 
- GitHub: 

## TILGANGER
**Sky-tilganger:**
- Type tilgang (read-only/begrenset): 
- Hvordan får vi tilgang: 

**IAM/RBAC:**
- Oppsett: 

**Testmiljø:**
- Separert fra prod? 
- Kontaktperson med tilganger: `,

    other: `## Scope
**Hva skal testes:**
- 

**URL-er/endepunkter/systemer:**
- 

**Hva inngår IKKE:**
- 

**Viktige brukerreiser/bruksmønstre:**
- 

## DOKUMENTASJON
**Teknisk dokumentasjon:**
- Confluence: 
- GitHub: 
- Annet: 

## TILGANGER
**Testbrukere:**
- 
- Dolly syntetiske brukere: [Bruker dere Dolly? Hvilke testpersoner skal vi bruke?]
- IDA-testidenter: [Har dere egne IDA-identer? Hvilke skal vi bruke?]

**API-nøkler/tilganger:**
- 

**Testdata:**
- `
  };

  return templates[pentestType] || templates.other;
};

const buildAdminRequestMessage = (requestId, user, data) => ({
  text: `Ny pentest-forespørsel: ${data.projectName || 'Uten navn'}`,
  blocks: [
    { type: 'header', text: { type: 'plain_text', text: '🔒 Ny pentest-forespørsel', emoji: true } },
    {
      type: 'section', fields: [
        { type: 'mrkdwn', text: `*Forespørsels-ID:*\n${requestId}` },
        { type: 'mrkdwn', text: `*Forespurt av:*\n<@${user.id}>` }
      ]
    },
    { type: 'divider' },
    {
      type: 'section', fields: [
        { type: 'mrkdwn', text: `*Prosjektnavn:*\n${data.projectName || 'Uten navn'}` },
        { type: 'mrkdwn', text: `*Testtype:*\n${data.pentestTypeText || 'Ikke oppgitt'}` },
        { type: 'mrkdwn', text: `*Hastegrad:*\n${data.urgencyText || 'Ikke oppgitt'}` }
      ]
    },
    { type: 'section', text: { type: 'mrkdwn', text: `*Testområde:*\n${data.targetScope || 'Ikke oppgitt'}` } },
    { type: 'section', text: { type: 'mrkdwn', text: `*Teammedlemmer:*\n${(data.teamMembers || []).map(id => `<@${id}>`).join(', ') || 'Ingen valgt'}` } },
    { type: 'section', text: { type: 'mrkdwn', text: `*Tilleggsinformasjon:*\n${data.additionalInfo || 'Ingen'}` } },
    { type: 'section', text: { type: 'mrkdwn', text: `*Fullstendig rapport:*\n${data.fullReport === 'yes' ? 'Ja' : data.fullReport === 'no' ? 'Nei' : 'Ikke oppgitt'}` } },
    { type: 'divider' },
    {
      type: 'actions', block_id: 'admin_actions', elements: [
        { type: 'button', text: { type: 'plain_text', text: '✅ Godkjenn', emoji: true }, style: 'primary', action_id: 'approve_request', value: requestId },
        { type: 'button', text: { type: 'plain_text', text: '❌ Avvis', emoji: true }, style: 'danger', action_id: 'reject_request', value: requestId },
        { type: 'button', text: { type: 'plain_text', text: '💬 Be om mer info', emoji: true }, action_id: 'request_info', value: requestId }
      ]
    }
  ]
});

const buildChannelWelcomeMessage = (requestId, request, approver, jiraUrl = null, checklistSelections = []) => {
  const requirements = getPreparationRequirements(request.pentestType);
  
  const blocks = [
    { type: 'header', text: { type: 'plain_text', text: `Pentest: ${request.projectName}`, emoji: true } },
    {
      type: 'section',
      fields: [
        { type: 'mrkdwn', text: `*Forespørsels-ID:*\n${requestId}` },
        { type: 'mrkdwn', text: `*Godkjent av:*\n<@${approver.id}>` },
        { type: 'mrkdwn', text: `*Testtype:*\n${request.pentestTypeText}` },
        { type: 'mrkdwn', text: `*Hastegrad:*\n${request.urgencyText}` }
      ]
    },
    { type: 'divider' },
    { type: 'section', text: { type: 'mrkdwn', text: `*Testområde:*\n${request.targetScope}` } },
    { type: 'section', text: { type: 'mrkdwn', text: `*Tilleggsinformasjon:*\n${request.additionalInfo || 'Ingen'}` } },
    { type: 'section', text: { type: 'mrkdwn', text: `*Fullstendig rapport:*\n${request.fullReport === 'yes' ? 'Ja' : request.fullReport === 'no' ? 'Nei' : 'Ikke oppgitt'}` } },
    { type: 'divider' },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*📋 Forberedelser før oppstartsmøte*

Du trenger ikke ha alt klart nå, men *før vi kaller inn til oppstartsmøte* ønsker vi følgende informasjon. Ta dialogen her i kanalen hvis du er usikker på noe!

*1. Scope*
${requirements.scope.join('\n')}

*2. Dokumentasjon*
${requirements.documentation.join('\n')}

*3. Tilganger og testdata*
${requirements.access.join('\n')}

*Når dette er klart:*
Vi kaller inn til oppstartsmøte hvor vi går gjennom informasjonen sammen, avklarer eventuelle mangler, og ber dere om en demo av applikasjonen for å forstå typiske brukerreiser og flyt.`
      }
    },
    {
      type: 'actions',
      block_id: `requester_checklist:${requestId}`,
      elements: [
        {
          type: 'checkboxes',
          action_id: 'requester_checklist',
          options: [
            { text: { type: 'plain_text', text: 'Scope (URL-er, endepunkter, avgrensning)' }, value: 'scope' },
            { text: { type: 'plain_text', text: 'Dokumentasjon (teknisk, Confluence, GitHub)' }, value: 'documentation' },
            { text: { type: 'plain_text', text: 'Tilganger (testbrukere, roller, testdata)' }, value: 'access' }
          ],
          ...(Array.isArray(checklistSelections) && checklistSelections.length
            ? {
              initial_options: checklistSelections.map((v) => ({
                text: { 
                  type: 'plain_text', 
                  text: v === 'scope' 
                    ? 'Scope (URL-er, endepunkter, avgrensning)' 
                    : v === 'documentation' 
                    ? 'Dokumentasjon (teknisk, Confluence, GitHub)' 
                    : 'Tilganger (testbrukere, roller, testdata)'
                },
                value: v
              }))
            }
            : {})
        }
      ]
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: `Påkrevd før oppstartsmøte: ${Array.isArray(checklistSelections) ? checklistSelections.length : 0}/3 fullført`
        }
      ]
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*Teammedlemmer:*\n${request.teamMembers.map(id => `<@${id}>`).join(', ') || 'Ingen valgt'}  
        
Velkommen! SåPe vil koordinere pentest-aktivitetene her i kanalen.`
      }
    },
    { type: 'divider' }
  ];

  if (jiraUrl) {
    blocks.push({
      type: 'section',
      text: { type: 'mrkdwn', text: `*🎫 Jira-sak:*\n${jiraUrl}` }
    });
  }

  blocks.push({
    type: 'actions',
    elements: [
      { type: 'button', text: { type: 'plain_text', text: 'Oppdater status', emoji: true }, action_id: 'update_status', value: requestId },
      { type: 'button', text: { type: 'plain_text', text: 'Vis forespørselsdetaljer', emoji: true }, action_id: 'view_details', value: requestId }
    ]
  });

  return { text: `Velkommen til pentest-kanalen for ${request.projectName}`, blocks };
};

const buildApprovedMessage = (requestId, request, approver, channelId, jiraUrl = null) => {
  const fields = [
    { type: 'mrkdwn', text: `*Forespørsels-ID:*\n${requestId}` },
    { type: 'mrkdwn', text: `*Prosjekt:*\n${request.projectName}` },
    { type: 'mrkdwn', text: `*Godkjent av:*\n<@${approver.id}>` },
    { type: 'mrkdwn', text: `*Kanal:*\n<#${channelId}>` }
  ];

  if (jiraUrl) fields.push({ type: 'mrkdwn', text: `*Jira-sak:*\n${jiraUrl}` });

  return {
    text: `Pentest-forespørsel godkjent: ${request.projectName}`,
    blocks: [
      { type: 'header', text: { type: 'plain_text', text: '✅ Pentest-forespørsel godkjent', emoji: true } },
      { type: 'section', fields }
    ]
  };
};

const buildRejectedMessage = (requestId, request, rejector, reason) => ({
  text: `Pentest-forespørsel avvist: ${request.projectName}`,
  blocks: [
    { type: 'header', text: { type: 'plain_text', text: '❌ Pentest-forespørsel avvist', emoji: true } },
    {
      type: 'section', fields: [
        { type: 'mrkdwn', text: `*Forespørsels-ID:*\n${requestId}` },
        { type: 'mrkdwn', text: `*Prosjekt:*\n${request.projectName}` },
        { type: 'mrkdwn', text: `*Avvist av:*\n<@${rejector.id}>` }
      ]
    },
    { type: 'section', text: { type: 'mrkdwn', text: `*Begrunnelse for avvisning:*\n${reason}` } }
  ]
});

function buildAppHomeView(userId, myRequests = []) {
  const introBlocks = [
    { type: 'header', text: { type: 'plain_text', text: '🔒 SåPe - Pentest bestilling', emoji: true } },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `Hei <@${userId}>! Her kan du bestille pentest. Klikk på knappen under for å starte en ny forespørsel.`
      }
    },
    {
      type: 'actions',
      elements: [
        {
          type: 'button',
          action_id: 'request_pentest',
          style: 'primary',
          text: { type: 'plain_text', text: 'Bestill pentest', emoji: true },
          value: 'open_pentest_modal'
        }
      ]
    },
    { type: 'divider' }
  ];

  const tipsBlock = {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `*Bestill pentest*

* Du trenger ikke ha alle detaljer klare for å sende inn en forespørsel. Det viktigste er å melde fra om et behov - så tar vi dialogen sammen etterpå.

*Hva skjer når du bestiller?*
1.  Du fyller ut det du vet i skjemaet (selv om det bare er grunnleggende info)
2.  Vi oppretter en privat Slack-kanal og en Jira-sak
3.  I kanalen får du en sjekkliste med hva vi trenger før oppstartsmøte
4.  Du følger opp med informasjonen i kanalen
5.  Når det er på plass, kaller vi inn til oppstartsmøte

*Hva trenger vi før oppstartsmøte?*
Dette får du detaljert beskrivelse av i kanalen, men i korte trekk:
•   *Scope:* Komplette URL-er, API-endepunkter, tydelig avgrensning
•   *Dokumentasjon:* Teknisk dokumentasjon, GitHub/Confluence-lenker
•   *Tilganger:* Testbrukere for alle roller, testdata i miljø

*Viktig: Ikke del sensitiv informasjon*
Ikke del passord eller konfidensiell informasjon i Slack. Les mer i <https://navno.sharepoint.com/sites/intranett-it/SitePages/Slik-bruker-vi-Slack-i-Nav.aspx|retningslinjene for bruk av Slack>.

For støtte, kontakt #team-sårbarhetsstyring-og-penetrasjonstesting.`
    }
  };

  return {
    type: 'home',
    blocks: [...introBlocks, tipsBlock]
  };
}

const buildPreparationTemplateMessage = (pentestType) => {
  const template = getPreparationTemplate(pentestType);
  return {
    text: 'Her er en mal du kan fylle ut',
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `📝 *Her er en mal for å samle informasjonen vi trenger*\n\nKopier teksten under, fyll ut det du kan, og send det tilbake i denne kanalen. Ikke bekymre deg hvis du ikke kan fylle ut alt - vi går gjennom det sammen!\n\n*Viktig:* Ikke skriv passord eller sensitiv informasjon her i Slack.`
        }
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `\`\`\`\n${template}\n\`\`\``
        }
      }
    ]
  };
};

module.exports = {
  buildAdminRequestMessage,
  buildChannelWelcomeMessage,
  buildApprovedMessage,
  buildRejectedMessage,
  buildAppHomeView,
  buildPreparationTemplateMessage,
  getPreparationTemplate
};