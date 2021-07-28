
export const schemas = new Set([
  {
    identifier: 'resource',
    name      : {
      en: 'Resource'
    }
  },
  {
    identifier: 'recommendation',
    name      : {
      en: 'Recommendation'
    }
  },
  {
    identifier: 'decision',
    name      : {
      en: 'Decision'
    }
  },
  {
    identifier: 'capacityBuildingInitiative',
    name      : {
      en: 'Initiative'
    }
  },
  {
    identifier: 'bbiOpportunity',
    name      : {
      en: 'Opportunity'
    }
  },
  {
    identifier: 'bbiRequest',
    name      : {
      en: 'Request for Assistance'
    }
  },
  {
    identifier: 'bbiProfile',
    name      : {
      en: 'Opportunity Provider Profile'
    }
  },
  {
    identifier: 'meetingDocument',
    name      : {
      en: 'Meeting Document'
    }
  },
  {
    identifier: 'pressRelease',
    name      : {
      en: 'Press Release'
    }
  },
  {
    identifier: 'news',
    name      : {
      en: 'News'
    }
  },
  {
    identifier: 'new',
    name      : {
      en: 'New'
    }
  },
  {
    identifier: 'statement',
    name      : {
      en: 'Statement'
    }
  },
  {
    identifier: 'meeting',
    name      : {
      en: 'Meeting'
    }
  },
  {
    identifier: 'notification',
    name      : {
      en: 'SCBD Official Notification'
    }
  }
].sort(compare))

function compare(a, b){
  if (a.name.en > b.name.en) return 1;
  if (b.name.en > a.name.en) return -1;

  return 0;
}