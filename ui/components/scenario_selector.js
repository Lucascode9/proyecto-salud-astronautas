const scenarioButtonsHTML=(scenarios,current)=>scenarios.map(s=>`<button type="button" data-id="${s.id}" aria-pressed="${s.id===current}">${s.name}</button>`).join("");
