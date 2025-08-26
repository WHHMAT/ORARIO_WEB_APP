let globalOrarioData = {}; // Ora sarà un oggetto per i dati raggruppati
// classHeaders non è più usato direttamente in displayGroupedOrario,
// ma può rimanere per riferimento se altre parti del codice lo usano per popolamento iniziale.
// La fonte primaria delle intestazioni dinamiche è ora groupData.class_headers dal backend.
//let classHeaders = [];

// Funzione per normalizzare le stringhe (corrisponde a Python)
function normalizzaStringa(s) {
    if (typeof s !== 'string' || !s) return "";
    s = s.replace(/À/g, 'A').replace(/È/g, 'E').replace(/É/g, 'E').replace(/Ì/g, 'I').replace(/Ò/g, 'O').replace(/Ù/g, 'U');
    s = s.replace(/à/g, 'a').replace(/è/g, 'e').replace(/é/g, 'e').replace(/ì/g, 'i').replace(/ò/g, 'o').replace(/ù/g, 'u');
    return s.trim().toUpperCase();
}

// Funzione per estrarre il giorno corretto da una riga (utile per l'ordinamento)
function getGiornoOrder(giorno) {
    const giorniOrdine = ["LUNEDI", "MARTEDI", "MERCOLEDI", "GIOVEDI", "VENERDI", "SABATO"]; // Assicurati che i nomi corrispondano esattamente al CSV
    const normalizedGiorno = normalizzaStringa(giorno);
    const index = giorniOrdine.indexOf(normalizedGiorno);
    return index !== -1 ? index : 99; // Restituisce un valore alto se non trovato
}


// Funzioni di utilità per estrarre i dati (copia da orario_core.py)
function estraeDocenti(cellaStr) {
    const docenti = new Set();
    if (typeof cellaStr !== 'string' || !cellaStr) return [];
    const matches = cellaStr.match(/\(([^)]+)\)/g);
    if (matches) {
        matches.forEach(match => {
            const innerContent = match.substring(1, match.length - 1);
            innerContent.split(',').forEach(d => {
                const cleanedDoc = normalizzaStringa(d);
                if (cleanedDoc) docenti.add(cleanedDoc);
            });
        });
    }
    return Array.from(docenti).sort();
}

function estraeMateria(cellaStr) {
    if (typeof cellaStr !== 'string' || !cellaStr) return "";
    let materia = cellaStr.split('(')[0];
    materia = materia.split('-')[0];
    return normalizzaStringa(materia);
}

function estraeClasseDaHeader(headerClasse) {
    if (headerClasse.startsWith('CLASSE')) {
        return normalizzaStringa(headerClasse.replace('CLASSE', '').trim());
    }
    return "";
}


function getAllGiorni(orario) {
    const giorni = new Set();
    for (const riga of orario) {
        const giorno = riga.GIORNO;
        if (giorno) {
            giorni.add(normalizzaStringa(giorno));
        }
    }
    const ordineGiorni = ["LUNEDI", "MARTEDI", "MERCOLEDI", "GIOVEDI", "VENERDI", "SABATO", "DOMENICA"];
    const giorniOrdinati = ordineGiorni.filter(g => giorni.has(g));
    giorniOrdinati.push(...Array.from(giorni).filter(g => !ordineGiorni.includes(g)).sort());
    return giorniOrdinati;
}

function getAllDocenti(orario) {
    const docenti = new Set();
    // Usa globalClassHeaders che è già popolato da orarioData.js
    for (const riga of orario) {
        for (const colonna of globalClassHeaders) { // Itera solo sulle colonne delle classi
            const contenutoCella = riga[colonna];
            if (typeof contenutoCella === 'string' && contenutoCella.trim()) {
                const singoleLezioni = contenutoCella.split('-');
                for (const lezioneStr of singoleLezioni) {
                    estraeDocenti(lezioneStr).forEach(d => docenti.add(d));
                }
            }
        }
    }
    return Array.from(docenti).sort();
}

function getAllClassi(orario) {
    // Le classi sono già disponibili in globalClassHeaders, basta estrarre i nomi puliti
    const classi = new Set();
    globalClassHeaders.forEach(header => {
        const extractedClass = estraeClasseDaHeader(header);
        if (extractedClass) {
            classi.add(extractedClass);
        }
    });
    return Array.from(classi).sort();
}

function getAllMaterie(orario) {
    const materie = new Set();
    for (const riga of orario) {
        for (const colonna of globalClassHeaders) {
            const contenutoCella = riga[colonna];
            if (typeof contenutoCella === 'string' && contenutoCella.trim()) {
                const singoleLezioni = contenutoCella.split('-');
                for (const lezioneStr of singoleLezioni) {
                    const materia = estraeMateria(lezioneStr);
                    if (materia) {
                        materie.add(materia);
                    }
                }
            }
        }
    }
    return Array.from(materie).sort();
}


// NUOVA Funzione: getDocentScheduleForDay (corrisponde a Python)
function getDocentScheduleForDay(orarioData, docentName, day) {
    const docentSchedule = [];
    const docentNameUpper = normalizzaStringa(docentName);
    const dayUpper = normalizzaStringa(day);

    for (const row of orarioData) {
        const rowDay = normalizzaStringa(row.GIORNO);
        const ora = row.ORE;

        if (rowDay === dayUpper) {
            for (const col in row) {
                if (col.startsWith('CLASSE') && typeof row[col] === 'string' && row[col].trim()) {
                    const cellContent = row[col];
                    const singleLessonsInCell = cellContent.split('-').map(s => s.trim()).filter(Boolean);

                    for (const lezioneStr of singleLessonsInCell) {
                        const docentiLezione = estraeDocenti(lezioneStr);
                        if (docentiLezione.includes(docentNameUpper)) {
                            docentSchedule.push({
                                classe_ora: col,
                                contenuto_cella: lezioneStr,
                                GIORNO: rowDay,
                                ORE: ora,
                                classe_estratta: estraeClasseDaHeader(col) // Aggiungi questo per il tooltip
                            });
                        }
                    }
                }
            }
        }
    }
    return docentSchedule;
}


// Funzione per leggere i dati iniziali e popolare le combobox (ora locale)
async function loadInitialData() {
    try {
        // I dati orario ora sono globali e disponibili subito da orarioData.js
        // orarioCompletoRaw è definito in orarioData.js

        const allDays = getAllGiorni(orarioCompletoRaw);
        const allDocents = getAllDocenti(orarioCompletoRaw);
        const allClasses = getAllClassi(orarioCompletoRaw);
        const allSubjects = getAllMaterie(orarioCompletoRaw);

        // Popola i filtri semplici
        populateSelect('giorno-select', allDays);
        populateSelect('docente-select', allDocents);
        populateSelect('classe-select', allClasses);
        populateSelect('materia-select', allSubjects);

        // Popola i filtri delle sostituzioni
        populateSelect('absent-docent-select', allDocents);
        populateSelect('absent-day-select', allDays);

        // Visualizza l'orario iniziale (completo) usando la nuova funzione di filtro
        // orarioCompletoRaw è un array, filtroOrarioGenerale lo elaborerà.
        // Il risultato sarà un oggetto raggruppato, come quello dal backend.
        globalOrarioData = filtroOrarioGenerale(orarioCompletoRaw, { classHeaders: globalClassHeaders });
        displayGroupedOrario(globalOrarioData);

    } catch (error) {
        console.error("Errore durante il caricamento dei dati iniziali (JS):", error);
        document.getElementById('output-message').textContent = "Errore durante il caricamento dei dati.";
    }
}

// NUOVA FUNZIONE: filtroOrarioGenerale (corrisponde a Python)
function filtroOrarioGenerale(orarioCompleto, filters = {}) {
    const {
        giorno = '',
        docente = '',
        classe = '',
        materia = '',
        comboType = '',
        valore1 = '',
        valore2 = ''
    } = filters;

    // globalClassHeaders è già disponibile da orarioData.js
    // Non è necessario ricalcolarlo o passarlo esplicitamente qui se è già una variabile globale.
    const classHeaders = globalClassHeaders;

    const groupedResults = {
        "Prime": { "class_headers": [], "rows": [] },
        "Seconde": { "class_headers": [], "rows": [] },
        "Terze": { "class_headers": [], "rows": [] },
        "Altre": { "class_headers": [], "rows": [] },
    };

    // Popola gli headers per ogni gruppo
    const primeHeaders = classHeaders.filter(h => estraeClasseDaHeader(h).startsWith('1')).sort();
    const secondeHeaders = classHeaders.filter(h => estraeClasseDaHeader(h).startsWith('2')).sort();
    const terzeHeaders = classHeaders.filter(h => estraeClasseDaHeader(h).startsWith('3')).sort();
    const altreHeaders = classHeaders.filter(h => !primeHeaders.includes(h) && !secondeHeaders.includes(h) && !terzeHeaders.includes(h)).sort();

    groupedResults["Prime"]["class_headers"] = primeHeaders;
    groupedResults["Seconde"]["class_headers"] = secondeHeaders;
    groupedResults["Terze"]["class_headers"] = terzeHeaders;
    groupedResults["Altre"]["class_headers"] = altreHeaders;

    const giornoNorm = normalizzaStringa(giorno);
    const docenteNorm = normalizzaStringa(docente);
    const classeNorm = normalizzaStringa(classe);
    const materiaNorm = normalizzaStringa(materia);
    const comboTypeNorm = normalizzaStringa(comboType);
    const valore1Norm = normalizzaStringa(valore1);
    const valore2Norm = normalizzaStringa(valore2);

    console.log(`DEBUG JS FILTRO: Input -> Giorno:'${giornoNorm}', Docente:'${docenteNorm}', Classe:'${classeNorm}', Materia:'${materiaNorm}'`);
    console.log(`DEBUG JS FILTRO: Combo -> Tipo:'${comboTypeNorm}' V1:'${valore1Norm}' V2:'${valore2Norm}'`);
    console.log(`DEBUG JS FILTRO: Global Class Headers ->`, classHeaders);
    console.log(`DEBUG JS FILTRO: Grouped Class Headers -> Prime: ${primeHeaders.length}, Seconde: ${secondeHeaders.length}, Terze: ${terzeHeaders.length}, Altre: ${altreHeaders.length}`);


    for (const rigaOriginale of orarioCompleto) {
        const giornoRigaNorm = normalizzaStringa(rigaOriginale.GIORNO || '');
        const oraRiga = rigaOriginale.ORE || '';

        if (giornoNorm && giornoRigaNorm !== giornoNorm) {
            continue;
        }

        const rowForPrime = { 'GIORNO': giornoRigaNorm, 'ORE': oraRiga };
        const rowForSeconde = { 'GIORNO': giornoRigaNorm, 'ORE': oraRiga };
        const rowForTerze = { 'GIORNO': giornoRigaNorm, 'ORE': oraRiga };
        const rowForAltre = { 'GIORNO': giornoRigaNorm, 'ORE': oraRiga };

        let hasPrimeMatches = false;
        let hasSecondeMatches = false;
        let hasTerzeMatches = false;
        let hasAltreMatches = false;

        for (const headerClasse of classHeaders) {
            const contenutoCellaOriginale = rigaOriginale[headerClasse] || '';

            const extractedClassName = estraeClasseDaHeader(headerClasse);
            let classeNumberPrefix = '';
            if (extractedClassName) {
                classeNumberPrefix = extractedClassName[0];
            }

            let targetGroupKey;
            if (classeNumberPrefix === '1') {
                targetGroupKey = "Prime";
            } else if (classeNumberPrefix === '2') {
                targetGroupKey = "Seconde";
            } else if (classeNumberPrefix === '3') {
                targetGroupKey = "Terze";
            } else {
                targetGroupKey = "Altre";
            }

            let currentRowForGroup;
            if (targetGroupKey === "Prime") currentRowForGroup = rowForPrime;
            else if (targetGroupKey === "Seconde") currentRowForGroup = rowForSeconde;
            else if (targetGroupKey === "Terze") currentRowForGroup = rowForTerze;
            else currentRowForGroup = rowForAltre;

            currentRowForGroup[headerClasse] = ''; // Initialize cell

            if (!contenutoCellaOriginale.trim()) {
                continue;
            }

            const singoleLezioniNellaCella = contenutoCellaOriginale.split('-').map(s => s.trim()).filter(Boolean);
            const matchedContentForCell = [];

            for (const lezioneStr of singoleLezioniNellaCella) {
                const docentiLezioneNorm = estraeDocenti(lezioneStr);
                const materiaLezioneNorm = estraeMateria(lezioneStr);
                const classeLezioneNormFromHeader = estraeClasseDaHeader(headerClasse);

                let matchSemplice = true;
                if (docenteNorm && !docentiLezioneNorm.includes(docenteNorm)) {
                    matchSemplice = false;
                }
                if (classeNorm && classeLezioneNormFromHeader !== classeNorm) {
                    matchSemplice = false;
                }
                if (materiaNorm && materiaLezioneNorm !== materiaNorm) {
                    matchSemplice = false;
                }

                let matchCombinato = true;
                if (comboTypeNorm && (valore1Norm || valore2Norm)) {
                    matchCombinato = false; // Presupponi no match finché non provato

                    if (comboTypeNorm === "DOCENTE E GIORNO") {
                        if (docentiLezioneNorm.includes(valore1Norm) && giornoRigaNorm === valore2Norm) {
                            matchCombinato = true;
                        }
                    } else if (comboTypeNorm === "CLASSE E GIORNO") {
                        if (classeLezioneNormFromHeader === valore1Norm && giornoRigaNorm === valore2Norm) {
                            matchCombinato = true;
                        }
                    } else if (comboTypeNorm === "DOCENTE E CLASSE") {
                        if (docentiLezioneNorm.includes(valore1Norm) && classeLezioneNormFromHeader === valore2Norm) {
                            matchCombinato = true;
                        }
                    } else if (comboTypeNorm === "MATERIA E GIORNO") {
                        if (materiaLezioneNorm === valore1Norm && giornoRigaNorm === valore2Norm) {
                            matchCombinato = true;
                        }
                    } else if (comboTypeNorm === "MATERIA E DOCENTE") {
                        if (materiaLezioneNorm === valore1Norm && docentiLezioneNorm.includes(valore2Norm)) {
                            matchCombinato = true;
                        }
                    }
                }

                if (matchSemplice && (!comboTypeNorm || matchCombinato)) {
                    matchedContentForCell.push(lezioneStr);
                    if (targetGroupKey === "Prime") hasPrimeMatches = true;
                    else if (targetGroupKey === "Seconde") hasSecondeMatches = true;
                    else if (targetGroupKey === "Terze") hasTerzeMatches = true;
                    else hasAltreMatches = true;
                }
            }

            if (currentRowForGroup && matchedContentForCell.length > 0) {
                currentRowForGroup[headerClasse] = matchedContentForCell.join(" - ");
            }
        }

        if (hasPrimeMatches) groupedResults["Prime"]["rows"].push(rowForPrime);
        if (hasSecondeMatches) groupedResults["Seconde"]["rows"].push(rowForSeconde);
        if (hasTerzeMatches) groupedResults["Terze"]["rows"].push(rowForTerze);
        if (hasAltreMatches) groupedResults["Altre"]["rows"].push(rowForAltre);
    }

    console.log(`DEBUG JS FILTRO: Fine elaborazione. Risultati raggruppati: ${JSON.stringify({ Prime: groupedResults.Prime.rows.length, Seconde: groupedResults.Seconde.rows.length, Terze: groupedResults.Terze.rows.length, Altre: groupedResults.Altre.rows.length })}`);
    return groupedResults;
}

// NUOVA FUNZIONE: findSubstitutes (corrisponde a Python)
function findSubstitutes(orarioData, docentAssenteName, giornoAssenza) {
    console.log(`In findSubstitutes: Docente Assente: ${docentAssenteName}, Giorno Assenza: ${giornoAssenza}`);

    if (!orarioData || orarioData.length === 0) {
        console.error("Errore: orarioData è vuoto in findSubstitutes. Impossibile procedere.");
        return { substitutes_for_table: [], substitute_suggestions: {}, message: "Dati orario non disponibili." };
    }

    const docentAssenteUpper = normalizzaStringa(docentAssenteName);
    const giornoAssenzaUpper = normalizzaStringa(giornoAssenza);

    const allDocents = getAllDocenti(orarioData); // Usiamo la funzione JS locale

    // Pre-calcola gli orari di tutti i docenti per il giorno specificato
    const allDocentsSchedulesForDay = {};
    for (const doc of allDocents) {
        allDocentsSchedulesForDay[normalizzaStringa(doc)] = getDocentScheduleForDay(orarioData, doc, giornoAssenza);
    }

    const docentAssenteSchedule = allDocentsSchedulesForDay[docentAssenteUpper] || [];
    console.log(`DEBUG: Lezioni trovate per il docente assente '${docentAssenteName}':`, docentAssenteSchedule);

    const substitutesForTable = [];
    const substituteSuggestionsByHour = {};

    if (docentAssenteSchedule.length === 0) {
        console.log(`DEBUG: Il docente assente '${docentAssenteName}' non ha lezioni programmate il ${giornoAssenza}.`);
        return {
            substitutes_for_table: [],
            substitute_suggestions: {},
            message: `Il docente assente '${docentAssenteName}' non ha lezioni programmate il ${giornoAssenza}.`
        };
    }

    // Raggruppa le lezioni del docente assente per ora
    const lessonsByHourAbsentDocent = {};
    for (const lesson of docentAssenteSchedule) {
        const ora = lesson.ORE;
        if (!lessonsByHourAbsentDocent[ora]) {
            lessonsByHourAbsentDocent[ora] = [];
        }
        lessonsByHourAbsentDocent[ora].push(lesson);
    }

    const oreDiLezioneDocenteAssente = Object.keys(lessonsByHourAbsentDocent).sort((a, b) => getOraNumericValue(a) - getOraNumericValue(b));

    for (const oraAssente of oreDiLezioneDocenteAssente) {
        const lezioneAssenteOra = lessonsByHourAbsentDocent[oraAssente];
        const potentialSubstitutes = [];
        const oraAssenteNum = getOraNumericValue(oraAssente);

        if (oraAssenteNum === null) {
            console.warn(`AVVISO: Ora '${oraAssente}' non mappata numericamente. Saltando valutazione priorità per quest'ora.`);
            continue;
        }

        for (const docentSupplente of allDocents) {
            const docentSupplenteUpper = normalizzaStringa(docentSupplente);

            if (docentSupplenteUpper === docentAssenteUpper) {
                continue;
            }

            const supplenteSchedule = allDocentsSchedulesForDay[docentSupplenteUpper] || [];
            
            // Controlla se il supplente è occupato in quest'ora
            const isSupplenteOccupato = supplenteSchedule.some(lez => lez.ORE === oraAssente);

            if (isSupplenteOccupato) {
                continue;
            }

            // Docente è libero in questa ora: valuta priorità

            // Priorità 1: Docente in Compresenza
            let isCompresenzaLessonForAbsent = false;
            let compresenzaPartner = null;
            for (const lessonOfAbsent of lezioneAssenteOra) {
                const materiaAssente = estraeMateria(lessonOfAbsent.contenuto_cella);
                if (materiaAssente === 'COMPRESENZA') {
                    isCompresenzaLessonForAbsent = true;
                    const otherDocentsInCell = estraeDocenti(lessonOfAbsent.contenuto_cella).filter(d => normalizzaStringa(d) !== docentAssenteUpper);
                    if (otherDocentsInCell.length > 0) {
                        compresenzaPartner = normalizzaStringa(otherDocentsInCell[0]);
                    }
                    // Consideriamo la prima classe di compresenza trovata
                    const classeCompresenza = estraeClasseDaHeader(lessonOfAbsent.classe_ora);
                    if (compresenzaPartner === docentSupplenteUpper) {
                         potentialSubstitutes.push({
                            docente: docentSupplente,
                            priority_score: 1, // Massima priorità
                            notes: `Già in compresenza nella classe ${classeCompresenza}`
                        });
                        break; // Trovato il partner di compresenza, passa al prossimo supplente
                    }
                }
            }
            if (compresenzaPartner === docentSupplenteUpper) {
                continue; // Già aggiunto, passa al prossimo supplente
            }

            // Priorità 2: Sostegno presente (Assumiamo una logica simile a Python, basata sulle lezioni)
            let isSostegnoDocent = false;
            for (const supplLesson of supplenteSchedule) {
                const supplMateria = estraeMateria(supplLesson.contenuto_cella);
                if (supplMateria === 'SOSTEGNO') {
                    isSostegnoDocent = true;
                    break;
                }
            }
            
            if (isSostegnoDocent) {
                potentialSubstitutes.push({
                    docente: docentSupplente,
                    priority_score: 2,
                    notes: "Docente di sostegno disponibile"
                });
                continue;
            }

            // Calcola le ore min/max del supplente nel giorno per il criterio di vicinanza/distanza
            const supplenteOreNumeriche = supplenteSchedule
                .map(l => getOraNumericValue(l.ORE))
                .filter(val => val !== null);

            // Criterio 4 (Esclusione): Docente troppo distante (riveduto per JS)
            let hasNearbyLesson = false;
            if (supplenteOreNumeriche.length > 0) {
                for (const sOraNum of supplenteOreNumeriche) {
                    if (Math.abs(oraAssenteNum - sOraNum) <= 2) {
                        hasNearbyLesson = true;
                        break;
                    }
                }
            }
            
            if (!hasNearbyLesson && supplenteOreNumeriche.length > 0) {
                 // Se il supplente ha altre lezioni quel giorno, ma nessuna è "vicina" all'ora di sostituzione
                 // e l'ora di sostituzione non è tra la sua prima e ultima ora, allora è distante.
                 const minSupplenteOra = Math.min(...supplenteOreNumeriche);
                 const maxSupplenteOra = Math.max(...supplenteOreNumeriche);
                 
                 if (!(oraAssenteNum >= minSupplenteOra && oraAssenteNum <= maxSupplenteOra)) {
                    console.log(`DEBUG: Escludendo ${docentSupplente} per ora ${oraAssente} (troppo distante).`);
                    continue; // Escludi il docente
                 }
            }


            // Priorità 3: Docenti liberi con ore impegnate vicine o completamente liberi
            let vicinanzaScore = 999;
            const notesVicinanza = [];
            
            if (supplenteOreNumeriche.length > 0) {
                for (const sOraNum of supplenteOreNumeriche) {
                    const diff = Math.abs(oraAssenteNum - sOraNum);
                    if (diff <= 2) {
                        vicinanzaScore = Math.min(vicinanzaScore, diff);
                        notesVicinanza.push(`Ha lezione alla ${getOraStringValue(sOraNum)} ora (distanza ${diff})`);
                    }
                }
            } else { // Il docente non ha altre lezioni quel giorno (totalmente libero)
                vicinanzaScore = 3; // Punteggio base per i docenti completamente liberi
            }

            if (vicinanzaScore < 999) {
                 const priorityScore = 3 + vicinanzaScore;
                 potentialSubstitutes.push({
                     docente: docentSupplente,
                     priority_score: priorityScore,
                     notes: notesVicinanza.length > 0 ? `Docente libero. ${notesVicinanza.join(' / ')}` : "Completamente libero nel giorno"
                 });
            } else {
                 potentialSubstitutes.push({
                     docente: docentSupplente,
                     priority_score: 99, // Bassa priorità
                     notes: "Docente libero, nessuna lezione vicina"
                 });
            }
        }

        potentialSubstitutes.sort((a, b) => {
            if (a.priority_score !== b.priority_score) {
                return a.priority_score - b.priority_score;
            }
            return a.docente.localeCompare(b.docente);
        });

        const selectedSubstitutes = potentialSubstitutes.slice(0, 5);
        
        for (const lessonOfAbsent of lezioneAssenteOra) {
            const classeColonnaRaw = lessonOfAbsent.classe_ora;
            const ora = lessonOfAbsent.ORE;
            
            for (const sub of selectedSubstitutes) {
                substitutesForTable.push({
                    docente: sub.docente,
                    ora_sostituzione: ora,
                    classe_sostituzione: classeColonnaRaw,
                    note_sostituzione: sub.notes
                });
            }
        }
        
        substituteSuggestionsByHour[oraAssente] = selectedSubstitutes.map(sub => sub.docente);
    }

    const substitutesForTableSorted = substitutesForTable.sort((a, b) => {
        const oraA = getOraNumericValue(a.ora_sostituzione);
        const oraB = getOraNumericValue(b.ora_sostituzione);
        if (oraA !== oraB) {
            return oraA - oraB;
        }
        return a.docente.localeCompare(b.docente);
    });
    
    console.log(`DEBUG: substitutesForTable (dati per la tabella):`, substitutesForTableSorted);
    console.log(`DEBUG: substituteSuggestions (dati per il textarea):`, substituteSuggestionsByHour);

    return {
        substitutes_for_table: substitutesForTableSorted,
        substitute_suggestions: substituteSuggestionsByHour,
        message: `Trovati ${substitutesForTableSorted.length} docenti disponibili per sostituzione.`,
        absent_docent: docentAssenteName
    };
}

// Funzione generica per popolare i <select> (con default "Tutti" o "Seleziona")
function populateSelect(selectId, optionsArray) {
    const selectElement = document.getElementById(selectId);
    if (!selectElement) {
        console.warn(`Elemento select con ID '${selectId}' non trovato.`);
        return;
    }
    selectElement.innerHTML = ''; // Pulisce le opzioni esistenti

    let defaultOptionText = "Tutti";
    if (selectId === 'combo-type-select') {
        defaultOptionText = "Seleziona tipo";
    } else if (selectId.includes('combo-val')) {
        defaultOptionText = "Seleziona";
    }
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = defaultOptionText;
    selectElement.appendChild(defaultOption);

    // Ordina l'array di opzioni prima di popolarle
    const sortedOptions = [...optionsArray].sort((a, b) => {
        // Per i giorni, usa l'ordinamento specifico
        if (selectId.includes('giorno')) {
            return getGiornoOrder(a) - getGiornoOrder(b);
        }
        // Altrimenti, ordinamento alfabetico standard
        return a.localeCompare(b);
    });

    sortedOptions.forEach(optionText => {
        const option = document.createElement('option');
        option.value = optionText;
        option.textContent = optionText;
        selectElement.appendChild(option);
    });
}

// Funzione ausiliaria per popolare le select con opzioni (usata per i combinati)
function populateSelectWithOptions(selectElement, optionsArray) {
    if (!selectElement) {
        console.warn(`Elemento select per opzioni combinato non trovato.`);
        return;
    }
    selectElement.innerHTML = '';
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Seleziona';
    selectElement.appendChild(defaultOption);

    // Ordina l'array di opzioni prima di popolarle
    const sortedOptions = [...optionsArray].sort((a, b) => {
        // Se la select è per i giorni, usa l'ordinamento specifico
        if ((selectElement.id === 'combo-val1-select' && document.getElementById('combo-type-select')?.value.includes('Giorno')) ||
            (selectElement.id === 'combo-val2-select' && document.getElementById('combo-type-select')?.value.includes('Giorno'))) {
            return getGiornoOrder(a) - getGiornoOrder(b);
        }
        return a.localeCompare(b);
    });

    sortedOptions.forEach(optionText => {
        const option = document.createElement('option');
        option.value = optionText;
        option.textContent = optionText;
        selectElement.appendChild(option);
    });
}

// NUOVA FUNZIONE: Visualizza l'orario raggruppato in tabelle separate
function displayGroupedOrario(groupedResults) {
    console.log("displayGroupedOrario called with:", groupedResults); // Debugging
    const outputMessage = document.getElementById('output-message');
    if (outputMessage) {
        outputMessage.textContent = ""; // Reset del messaggio generale
    }

    let totalResultsCount = 0;
    let foundAnyResults = false; // Sarà true se almeno un gruppo ha risultati

    // Definisci l'ordine e i selettori per le sezioni
    const groupOrder = ['Prime', 'Seconde', 'Terze', 'Altre']; // Usa le stesse chiavi del backend
    const sectionSelectors = {
        'Prime': { id: 'prime-classes-section', containerId: 'prime-table-container', title: 'Classi Prime' },
        'Seconde': { id: 'seconde-classes-section', containerId: 'seconde-table-container', title: 'Classi Seconde' },
        'Terze': { id: 'terze-classes-section', containerId: 'terze-table-container', title: 'Classi Terze' },
        'Altre': { id: 'altre-classes-section', containerId: 'altre-table-container', title: 'Altre Classi' }
    };

    // Pulisci e nascondi tutte le sezioni prima di riempirle
    Object.values(sectionSelectors).forEach(info => {
        const sectionElement = document.getElementById(info.id);
        const tableContainer = document.getElementById(info.containerId);

        if (sectionElement) {
            sectionElement.style.display = 'none'; // Nascondi di default
        }
        if (tableContainer) {
            tableContainer.innerHTML = ''; // Pulisci il contenuto del contenitore della tabella
        }
    });

    for (const groupKey of groupOrder) {
        const groupData = groupedResults[groupKey]; // Ottieni i dati per il gruppo (es. 'Prime')
        const sectionInfo = sectionSelectors[groupKey]; // Ottieni gli ID e il titolo per la sezione

        const sectionElement = document.getElementById(sectionInfo.id);
        const tableContainer = document.getElementById(sectionInfo.containerId);

        // Aggiungi un controllo robusto per l'esistenza di groupData e le sue proprietà
        if (sectionElement && tableContainer && groupData && Array.isArray(groupData.rows) && groupData.rows.length > 0) {
            foundAnyResults = true;
            totalResultsCount += groupData.rows.length;
            sectionElement.style.display = 'block'; // Mostra la sezione se ci sono risultati

            console.log(`Processing group: ${groupKey}`);
            console.log(`Class Headers for ${groupKey}:`, groupData.class_headers); // DEBUG: Controlla questo!
            console.log(`Sample row for ${groupKey}:`, groupData.rows[0]); // DEBUG: Controlla anche questo!

            // Crea il contenitore per lo scroll
            const tableScrollContainer = document.createElement('div');
            tableScrollContainer.classList.add('table-scroll-container');

            // Crea la tabella
            const table = document.createElement('table');
            table.classList.add('results-table');

            // Intestazione della tabella
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');

            // Intestazioni fisse
            const thGiorno = document.createElement('th');
            thGiorno.textContent = 'Giorno';
            headerRow.appendChild(thGiorno);

            const thOra = document.createElement('th');
            thOra.textContent = 'Ora';
            headerRow.appendChild(thOra);

            // Intestazioni delle classi dinamiche
            // QUI IL CAMBIO PIÙ IMPORTANTE: Assicurati che groupData.class_headers sia il campo corretto
            if (Array.isArray(groupData.class_headers)) { // Ora si aspetta 'class_headers'
                groupData.class_headers.forEach(header => {
                    const th = document.createElement('th');
                    th.textContent = header;
                    headerRow.appendChild(th);
                });
            } else {
                console.warn(`'class_headers' non trovato o non è un array per il gruppo: ${groupKey}. Verificare il backend.`);
            }
            thead.appendChild(headerRow);
            table.appendChild(thead);

            // Corpo della tabella
            const tbody = document.createElement('tbody');

            // Ordina le righe per giorno e poi per ora
            const sortedRows = [...groupData.rows].sort((a, b) => {
                const giornoA = getGiornoOrder(a.GIORNO);
                const giornoB = getGiornoOrder(b.GIORNO);
                if (giornoA !== giornoB) {
                    return giornoA - giornoB;
                }
                // Assumiamo che l'ora sia un numero o convertibile in numero
                const oraA = parseInt(a.ORE, 10);
                const oraB = parseInt(b.ORE, 10);
                return oraA - oraB;
            });


            sortedRows.forEach(riga => {
                const tr = document.createElement('tr');

                const tdGiorno = document.createElement('td');
                tdGiorno.textContent = riga.GIORNO || '';
                tr.appendChild(tdGiorno);

                const tdOra = document.createElement('td');
                tdOra.textContent = riga.ORE || '';
                tr.appendChild(tdOra);

                // Popolamento delle celle delle classi
                if (Array.isArray(groupData.class_headers)) { // Anche qui si aspetta 'class_headers'
                    groupData.class_headers.forEach(header => {
                        const td = document.createElement('td');
                        const cellContent = riga[header] || ''; // 'header' deve corrispondere alla chiave JSON nella riga

                        // Implementazione del tooltip
                        if (cellContent) {
                            td.classList.add('schedule-cell'); // Mantiene questa classe per identificare le celle con contenuto
                            const mainText = estraeMateriaFrontend(cellContent); // Mostra solo la materia come testo principale
                            td.textContent = mainText;

                            // --- MODIFICHE PER IL TOOLTIP ---

                            // Aggiungiamo attributi data-* alla cella per recuperare facilmente le informazioni
                            td.dataset.materia = estraeMateriaFrontend(cellContent) || 'N/D';
                            td.dataset.docenti = estraeDocentiFrontend(cellContent).join(', ') || 'N/D';
                            td.dataset.classe = header; // La classe della colonna
                            td.dataset.giorno = riga.GIORNO || 'N/D';
                            td.dataset.ora = riga.ORE || 'N/D';
                            td.dataset.fullContent = cellContent; // Utile per il debug o per mostrare il contenuto completo se necessario


                            // Aggiungiamo gli event listener per mouseover e mouseleave alla cella
                            td.addEventListener('mouseover', function(event) {
                                // Rimuovi eventuali tooltip esistenti prima di crearne uno nuovo
                                const existingTooltip = document.querySelector('.schedule-cell-tooltip-text');
                                if (existingTooltip) {
                                    existingTooltip.remove();
                                }

                                const currentCell = event.currentTarget; // La cella su cui il mouse è entrato
                                const materia = currentCell.dataset.materia;
                                const docenti = currentCell.dataset.docenti;
                                const classe = currentCell.dataset.classe;
                                const giorno = currentCell.dataset.giorno;
                                const ora = currentCell.dataset.ora;

                                const tooltip = document.createElement('div');
                                tooltip.classList.add('schedule-cell-tooltip-text'); // Usa la classe CSS definita
                                tooltip.innerHTML = `
                                    <strong>Materia:</strong> ${materia}<br>
                                    <strong>Docente:</strong> ${docenti}<br>
                                    <strong>Classe:</strong> ${classe}<br>
                                    <strong>Giorno:</strong> ${giorno}<br>
                                    <strong>Ora:</strong> ${ora}
                                `;
                                
                                // *** Appendi il tooltip direttamente al body! ***
                                document.body.appendChild(tooltip);

                                // Calcola la posizione della cella trigger
                                const cellRect = currentCell.getBoundingClientRect();

                                // Prova a posizionare il tooltip SOPRA la cella
                                // tooltip.offsetHeight non è disponibile finché non è nel DOM
                                // Per calcolarlo correttamente, potremmo aver bisogno di renderlo temporaneamente visibile
                                // o impostare una larghezza fissa per il calcolo iniziale se il contenuto varia molto
                                // Per ora, supponiamo che offsetHeight sia disponibile dopo appendChild
                                
                                // Un piccolo hack per ottenere l'altezza corretta se il tooltip ha "opacity: 0" o "visibility: hidden"
                                // al momento del calcolo. Lo rendiamo visibile per un attimo, calcoliamo, poi ripristiniamo.
                                const originalOpacity = tooltip.style.opacity;
                                const originalVisibility = tooltip.style.visibility;
                                tooltip.style.opacity = '0'; // Assicurati che sia 0 per evitare flash
                                tooltip.style.visibility = 'visible';
                                const tooltipHeight = tooltip.offsetHeight; // Ora è calcolabile
                                tooltip.style.opacity = originalOpacity; // Ripristina
                                tooltip.style.visibility = originalVisibility; // Ripristina

                                let tooltipTop = cellRect.top - tooltipHeight - 5; // 5px sopra la cella

                                // Se non c'è abbastanza spazio SOPRA (es. vicino al top della viewport), posizionalo SOTTO
                                const viewportMargin = 10; // Un piccolo margine dal bordo superiore della viewport
                                if (tooltipTop < viewportMargin) {
                                    tooltipTop = cellRect.bottom + 5; // 5px sotto la cella
                                }

                                // Applica lo stile
                                tooltip.style.position = 'absolute';
                                tooltip.style.zIndex = '1050'; // Assicurati che sia un valore alto
                                // Aggiungi window.scrollX e window.scrollY per posizionare rispetto al documento
                                tooltip.style.left = `${cellRect.left + window.scrollX}px`;
                                tooltip.style.top = `${tooltipTop + window.scrollY}px`;

                                // Ora rendi il tooltip visibile con una transizione
                                tooltip.style.opacity = '1';
                                tooltip.style.visibility = 'visible';

                                // Aggiungi un event listener per nascondere il tooltip quando il mouse esce dalla cella o dal tooltip
                                let hideTimeout;
                                const hideTooltip = () => {
                                    clearTimeout(hideTimeout);
                                    hideTimeout = setTimeout(() => {
                                        if (tooltip.parentNode === document.body) {
                                            tooltip.remove();
                                        }
                                    }, 50); // Piccolo ritardo per transizioni fluide
                                };

                                // Event listener sulla cella e sul tooltip per nasconderlo
                                currentCell.addEventListener('mouseleave', hideTooltip);
                                tooltip.addEventListener('mouseleave', hideTooltip);
                                // Annulla l'hide se il mouse rientra nel tooltip (evita che scompaia se si passa sopra)
                                tooltip.addEventListener('mouseenter', () => clearTimeout(hideTimeout));
                            });

                            // --- FINE MODIFICHE PER IL TOOLTIP ---

                        } else {
                            td.textContent = ''; // Cella vuota
                        }
                        tr.appendChild(td);
                    });
                }
                tbody.appendChild(tr);
            });
            table.appendChild(tbody);
            tableScrollContainer.appendChild(table);
            tableContainer.appendChild(tableScrollContainer); // Aggiungi il contenitore con la tabella al div del contenitore
        }
    }

    const resultsSection = document.getElementById('results-section');
    if (!foundAnyResults) {
        if (outputMessage) {
            outputMessage.textContent = "Nessun risultato trovato per i filtri selezionati.";
        }
        if (resultsSection) resultsSection.style.display = 'none'; // Nascondi la sezione se non ci sono risultati
    } else {
        if (outputMessage) {
            outputMessage.textContent = `Trovati ${totalResultsCount} risultati totali.`;
        }
        if (resultsSection) resultsSection.style.display = 'block'; // Mostra la sezione se ci sono risultati
    }
}

// Funzioni di estrazione per il frontend (JavaScript) - DEVONO RISPECCHIARE QUELLE IN PYTHON
// Questo è importante per il tooltip
function estraeDocentiFrontend(cellaStr) {
    const docenti = [];
    if (typeof cellaStr !== 'string' || !cellaStr) return [];
    // Cerca pattern tipo (NOME COGNOME) o (NOME COGNOME, NOME COGNOME)
    const matches = cellaStr.match(/\(([^)]+)\)/g);
    if (matches) {
        matches.forEach(match => {
            const innerContent = match.substring(1, match.length - 1); // Rimuove le parentesi
            // Dividi per virgola e pulisci ogni nome docente
            innerContent.split(',').forEach(d => {
                const cleanedDoc = normalizzaStringa(d);
                if (cleanedDoc) docenti.push(cleanedDoc);
            });
        });
    }
    return docenti;
}

function estraeMateriaFrontend(cellaStr) {
    if (typeof cellaStr !== 'string' || !cellaStr) return "";
    let materia = cellaStr.split('(')[0]; // Prende la parte prima della prima parentesi
    materia = materia.split('-')[0]; // Prende la parte prima del primo trattino
    return normalizzaStringa(materia);
}


// Funzione per applicare i filtri (centralizzata)
// Funzione per applicare i filtri (centralizzata, ora opera localmente)
async function applyFilters() { // Mantenuto async per coerenza, anche se non c'è più fetch
    console.log("--- applyFilters() chiamata ---");
    const giorno = document.getElementById('giorno-select')?.value || '';
    const docente = document.getElementById('docente-select')?.value || '';
    const classe = document.getElementById('classe-select')?.value || '';
    const materia = document.getElementById('materia-select')?.value || '';

    const comboType = document.getElementById('combo-type-select')?.value || '';
    const valore1 = document.getElementById('combo-val1-select')?.value || '';
    const valore2 = document.getElementById('combo-val2-select')?.value || '';
    const exportDocentBtn = document.getElementById('exportDocentBtn');

    // Controlla se il pulsante esiste
    if (exportDocentBtn) {
        // Mostra il pulsante solo se è selezionato un singolo docente e nessun altro filtro
        if (docente !== '' && !giorno && !classe && !materia && !comboType) {
            exportDocentBtn.style.display = 'block';
        } else {
            exportDocentBtn.style.display = 'none';
        }
    }

    console.log(`Valori al momento della chiamata: Giorno='${giorno}', Docente='${docente}', Classe='${classe}', Materia='${materia}'`);
    console.log(`Valori al momento della chiamata: ComboType='${comboType}', Valore1='${valore1}', Valore2='${valore2}'`);

    let filters = {};

    const isCombinedFilterSelected = (comboType !== '' && valore1 !== '' && valore2 !== '');
    const isSimpleFilterActive = (giorno || docente || classe || materia);

    if (isCombinedFilterSelected) {
        filters = {
            giorno: '', // Resetta i filtri semplici se si usano i combinati
            docente: '',
            classe: '',
            materia: '',
            comboType: comboType,
            valore1: valore1,
            valore2: valore2
        };
        const simpleSelects = document.querySelectorAll('#simpleFilters .filter-select');
        simpleSelects.forEach(s => s.value = '');

    } else if (isSimpleFilterActive) {
        filters = {
            giorno: giorno,
            docente: docente,
            classe: classe,
            materia: materia,
            comboType: '', // Resetta i filtri combinati se si usano i semplici
            valore1: '',
            valore2: ''
        };
        document.getElementById('combo-type-select').value = '';
        updateCombinedSelects();
    } else {
        // Nessun filtro selezionato (o reset generale)
        // Se non ci sono filtri attivi, torna alla visualizzazione iniziale (orario completo)
        // La funzione filtroOrarioGenerale senza filtri ritorna l'orario completo raggruppato
        globalOrarioData = filtroOrarioGenerale(orarioCompletoRaw, { classHeaders: globalClassHeaders });
        displayGroupedOrario(globalOrarioData);
        return;
    }

    try {
        // Chiamata diretta alla funzione di filtro locale
        const resultsGrouped = filtroOrarioGenerale(orarioCompletoRaw, filters);
        displayGroupedOrario(resultsGrouped);
    } catch (error) {
        console.error("Errore nell'applicazione dei filtri (JS):", error);
        document.getElementById('output-message').textContent = "Errore nell'applicazione dei filtri.";
    }
}

// Funzione per aggiornare le ComboBox dei filtri combinati (solo popolamento, non applica il filtro)
function updateCombinedSelects() {
    const comboType = document.getElementById('combo-type-select');
    const comboVal1Select = document.getElementById('combo-val1-select');
    const comboVal2Select = document.getElementById('combo-val2-select');
    const comboVal1Label = document.getElementById('combo-val1-label');
    const comboVal2Label = document.getElementById('combo-val2-label');

    // Controllo esistenza degli elementi
    if (!comboType || !comboVal1Select || !comboVal2Select || !comboVal1Label || !comboVal2Label) {
        console.error("Uno o più elementi dei filtri combinati non trovati.");
        return;
    }

    // Resetta sempre le selezioni e le opzioni
    comboVal1Select.innerHTML = '<option value="">Seleziona</option>';
    comboVal2Select.innerHTML = '<option value="">Seleziona</option>';
    comboVal1Select.value = '';
    comboVal2Select.value = '';

    // Nascondi i campi per default (saranno mostrati se il tipo è valido)
    comboVal1Label.style.display = 'none';
    comboVal1Select.style.display = 'none';
    comboVal2Label.style.display = 'none';
    comboVal2Select.style.display = 'none';

    let values1 = [];
    let values2 = [];

    // Popola i dropdown in base al tipo combinato selezionato
    // Recupera i dati dai select già popolati all'avvio per coerenza
    // Aggiunto controllo di esistenza per i select sorgente
    const allDocents = Array.from(document.getElementById('docente-select')?.options || []).map(opt => opt.value).filter(v => v !== '');
    const allDays = Array.from(document.getElementById('giorno-select')?.options || []).map(opt => opt.value).filter(v => v !== '');
    const allClasses = Array.from(document.getElementById('classe-select')?.options || []).map(opt => opt.value).filter(v => v !== '');
    const allSubjects = Array.from(document.getElementById('materia-select')?.options || []).map(opt => opt.value).filter(v => v !== '');


    switch (comboType.value) { // Usa .value per il select element
        case 'Docente e Giorno':
            values1 = allDocents;
            values2 = allDays;
            comboVal1Label.textContent = "Docente:";
            comboVal2Label.textContent = "Giorno:";
            break;
        case 'Classe e Giorno':
            values1 = allClasses;
            values2 = allDays;
            comboVal1Label.textContent = "Classe:";
            comboVal2Label.textContent = "Giorno:";
            break;
        case 'Docente e Classe':
            values1 = allDocents;
            values2 = allClasses;
            comboVal1Label.textContent = "Docente:";
            comboVal2Label.textContent = "Classe:";
            break;
        case 'Materia e Giorno':
            values1 = allSubjects;
            values2 = allDays;
            comboVal1Label.textContent = "Materia:";
            comboVal2Label.textContent = "Giorno:";
            break;
        case 'Materia e Docente':
            values1 = allSubjects;
            values2 = allDocents;
            comboVal1Label.textContent = "Materia:";
            comboVal2Label.textContent = "Docente:";
            break;
        default:
            return;
    }

    if (values1.length > 0) {
        populateSelectWithOptions(comboVal1Select, Array.from(new Set(values1)).sort());
        comboVal1Label.style.display = 'block';
        comboVal1Select.style.display = 'block';
    }

    if (values2.length > 0) {
        populateSelectWithOptions(comboVal2Select, Array.from(new Set(values2)).sort());
        comboVal2Label.style.display = 'block';
        comboVal2Select.style.display = 'block';
    }
}

// Funzione per resettare i filtri semplici
function resetSimpleFilters() {
    const giornoSelect = document.getElementById('giorno-select');
    const docenteSelect = document.getElementById('docente-select');
    const classeSelect = document.getElementById('classe-select');
    const materiaSelect = document.getElementById('materia-select');

    if (giornoSelect) giornoSelect.value = '';
    if (docenteSelect) docenteSelect.value = '';
    if (classeSelect) classeSelect.value = '';
    if (materiaSelect) materiaSelect.value = '';

    applyFilters(); // Applica i filtri (che ora dovrebbe mostrare l'orario completo se tutti i filtri sono vuoti)
}

// Funzione per resettare i filtri combinati
function resetCombinedFilters() {
    const comboTypeSelect = document.getElementById('combo-type-select');
    if (comboTypeSelect) {
        comboTypeSelect.value = '';
    }
    updateCombinedSelects(); // Questo nasconderà e resetterà i campi dei valori

    applyFilters(); // Applica i filtri (che ora dovrebbe mostrare l'orario completo se tutti i filtri sono vuoti)
}

// Funzioni per la gestione delle tab
function openTab(evt, tabName) {
    let i, tabcontent, tabbuttons;

    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tabbuttons = document.getElementsByClassName("tab-button");
    for (i = 0; i < tabbuttons.length; i++) {
        tabbuttons[i].className = tabbuttons[i].className.replace(" active", "");
    }

    const targetTab = document.getElementById(tabName);
    if (targetTab) {
        targetTab.style.display = "block";
    }
    if (evt && evt.currentTarget) { // Check if evt and currentTarget exist
        evt.currentTarget.className += " active";
    }


    // Quando si cambia tab, resetta i filtri delle altre tab
    if (tabName === 'simpleFilters') {
        resetCombinedFilters();
        resetSostituzioniFilters();
    } else if (tabName === 'combinedFilters') {
        resetSimpleFilters();
        resetSostituzioniFilters();
    } else if (tabName === 'sostituzioniFilters') {
        resetSimpleFilters();
        resetCombinedFilters();
    }
}


// Event listeners e inizializzazione all'avvio della pagina
document.addEventListener('DOMContentLoaded', async () => {
    await loadInitialData();
    updateCombinedSelects(); // Inizializza le combobox combinate per nasconderle all'avvio

    // Attiva la prima tab (Filtri Semplici) all'avvio
    // Assicurati che l'elemento esista prima di manipolarlo
    const simpleFiltersTab = document.getElementById('simpleFilters');
    const simpleFiltersButton = document.querySelector('.tab-button[data-tab="simpleFilters"]');

    if (simpleFiltersTab) {
        simpleFiltersTab.style.display = 'block';
    }
    if (simpleFiltersButton) {
        simpleFiltersButton.classList.add('active');
    }

    // ** Event Listeners **

    // Event listener per i pulsanti delle tab
    const tabButtons = document.getElementsByClassName("tab-button");
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].addEventListener('click', (event) => {
            openTab(event, event.target.dataset.tab);
        });
    }

    // Event listener per i filtri semplici (Docente, Classe, Materia, Giorno)
    const simpleFilterSelects = document.querySelectorAll('#simpleFilters .filter-select');
    simpleFilterSelects.forEach(select => {
        select.addEventListener('change', applyFilters);
    });

    // Event listener per il bottone "Cerca" dei filtri semplici (rimosso se si filtra al change)
    // const searchSimpleBtn = document.getElementById('searchSimpleBtn');
    // if (searchSimpleBtn) searchSimpleBtn.addEventListener('click', applyFilters);

    // Event listener per il tipo di filtro combinato - QUI CHIAMIAMO SOLO updateCombinedSelects
    const comboTypeSelect = document.getElementById('combo-type-select');
    if (comboTypeSelect) comboTypeSelect.addEventListener('change', updateCombinedSelects);

    // Event listener per i valori dei filtri combinati - QUI CHIAMIAMO applyFilters
    const comboVal1Select = document.getElementById('combo-val1-select');
    const comboVal2Select = document.getElementById('combo-val2-select');
    if (comboVal1Select) comboVal1Select.addEventListener('change', applyFilters);
    if (comboVal2Select) comboVal2Select.addEventListener('change', applyFilters);

    // Event listener per il bottone "Cerca Combinato" (rimosso se si filtra al change)
    // const searchCombinedBtn = document.getElementById('searchCombinedBtn');
    // if (searchCombinedBtn) searchCombinedBtn.addEventListener('click', applyFilters);

    // Event listener per i pulsanti Reset
    const resetSimpleBtn = document.getElementById('resetSimpleBtn');
    if (resetSimpleBtn) resetSimpleBtn.addEventListener('click', resetSimpleFilters);
    const resetCombinedBtn = document.getElementById('resetCombinedBtn');
    if (resetCombinedBtn) resetCombinedBtn.addEventListener('click', resetCombinedFilters);

    // Event listener per i filtri delle sostituzioni
    const searchSostituzioniBtn = document.getElementById('searchSostituzioniBtn');
    if (searchSostituzioniBtn) searchSostituzioniBtn.addEventListener('click', searchSubstitutes);
    const resetSostituzioniBtn = document.getElementById('resetSostituzioniBtn');
    if (resetSostituzioniBtn) resetSostituzioniBtn.addEventListener('click', resetSostituzioniFilters);

    // Event listener per i dropdown delle sostituzioni (ora filtrano al cambio, se vuoi)
    const absentDocentSelect = document.getElementById('absent-docent-select');
    const absentDaySelect = document.getElementById('absent-day-select');
    if (absentDocentSelect) absentDocentSelect.addEventListener('change', searchSubstitutes);
    if (absentDaySelect) absentDaySelect.addEventListener('change', searchSubstitutes);

    // Event listener per il nuovo pulsante di esportazione docente
    const exportDocentBtn = document.getElementById('exportDocentBtn');
    if (exportDocentBtn) {
        exportDocentBtn.addEventListener('click', exportDocentScheduleToPdf);
    }
});


// Funzione per la ricerca sostituzioni
// Funzione per la ricerca sostituzioni (ora opera localmente)
async function searchSubstitutes() { // Mantenuto async per coerenza, anche se non c'è più fetch
    const absentDocent = document.getElementById('absent-docent-select')?.value || '';
    const absentDay = document.getElementById('absent-day-select')?.value || '';

    const messageDiv = document.getElementById('sostituzioni-output-message');
    const tableContainer = document.getElementById('sostituzioni-table-container');
    const textOutputElement = document.getElementById('sostituzioni-text-output');

    if (messageDiv) messageDiv.textContent = '';
    if (tableContainer) tableContainer.innerHTML = '';
    if (textOutputElement) textOutputElement.value = '';

    if (!absentDocent || !absentDay) {
        if (messageDiv) {
            messageDiv.textContent = "Per favore, seleziona sia il docente assente che il giorno dell'assenza per cercare le sostituzioni.";
        }
        displaySostituzioniOutput({
            substitutes_for_table: [],
            substitute_suggestions: {},
            message: "Per favore, seleziona sia il docente assente che il giorno dell'assenza per cercare le sostituzioni.",
            absent_docent: absentDocent
        });
        return;
    }

    try {
        // Chiamata diretta alla funzione di ricerca sostituzioni locale
        const data = findSubstitutes(orarioCompletoRaw, absentDocent, absentDay);

        if (data.error) {
            if (messageDiv) {
                messageDiv.textContent = `Errore: ${data.error}`;
            }
            displaySostituzioniOutput({
                substitutes_for_table: [],
                substitute_suggestions: {},
                message: `Errore: ${data.error}`,
                absent_docent: absentDocent
            });
        } else {
            displaySostituzioniOutput(data);
        }
    } catch (error) {
        console.error("Errore durante la ricerca sostituzioni (JS):", error);
        if (messageDiv) {
            messageDiv.textContent = "Errore durante la ricerca sostituzioni (problema nello script).";
        }
        displaySostituzioniOutput({
            substitutes_for_table: [],
            substitute_suggestions: {},
            message: "Errore durante la ricerca sostituzioni (problema nello script).",
            absent_docent: absentDocent
        });
    }
}

// La funzione displaySostituzioniOutput rimane esattamente come l'hai fornita,
// poiché ora riceverà l'oggetto 'data' completo con le chiavi 'substitutes_for_table',
// 'substitute_suggestions', 'absent_docent' e 'message'.
// ... (il resto della funzione displaySostituzioniOutput) ...

// Funzione per visualizzare l'output delle sostituzioni
function displaySostituzioniOutput(data) { // Ora accetta un oggetto 'data'
    const messageDiv = document.getElementById('sostituzioni-output-message');
    const tableContainer = document.getElementById('sostituzioni-table-container');
    const textOutputElement = document.getElementById('sostituzioni-text-output'); // Il nuovo textarea

    // Pulisci i contenuti precedenti
    if (messageDiv) {
        messageDiv.textContent = '';
    }
    if (tableContainer) {
        tableContainer.innerHTML = '';
    }
    if (textOutputElement) {
        textOutputElement.value = ''; // Pulisci il textarea
    }

    // Estrai i dati per la tabella (si aspetta 'substitutes_for_table' dal backend)
    const substitutesArray = data.substitutes_for_table; //

    if (!Array.isArray(substitutesArray) || substitutesArray.length === 0) {
        if (messageDiv) {
            messageDiv.textContent = data.message || "Nessun docente disponibile trovato per la sostituzione."; //
        }
        // Anche se non ci sono tabelle, potremmo voler generare un testo nel textarea
        if (textOutputElement && data.absent_docent) { //
            textOutputElement.value = `Non sono state trovate sostituzioni specifiche per la docente ${data.absent_docent}.`; //
        }
        return;
    } else {
        if (messageDiv) {
            messageDiv.textContent = data.message || `Trovati ${substitutesArray.length} docenti disponibili per sostituzione.`; //
        }
    }

    // Crea la tabella
    const table = document.createElement('table');
    table.classList.add('table', 'table-bordered', 'table-striped'); // Usa classi Bootstrap per lo stile

    // Intestazioni della tabella
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    ['Docente', 'Ora Sostituzione', 'Classe Sostituzione', 'Note Sostituzione'].forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Corpo della tabella
    const tbody = document.createElement('tbody');
    substitutesArray.forEach(substitute => { //
        const row = document.createElement('tr');
        const docenteCell = document.createElement('td');
        docenteCell.textContent = substitute.docente || ''; //
        row.appendChild(docenteCell);

        const oraCell = document.createElement('td');
        oraCell.textContent = substitute.ora_sostituzione || ''; //
        row.appendChild(oraCell);

        const classeCell = document.createElement('td');
        classeCell.textContent = substitute.classe_sostituzione || ''; //
        row.appendChild(classeCell);

        const noteCell = document.createElement('td');
        noteCell.textContent = substitute.note_sostituzione || ''; //
        row.appendChild(noteCell);

        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    if (tableContainer) {
        tableContainer.appendChild(table);
    }

    // --- LOGICA AGGIORNATA PER GENERARE IL TESTO NEL TEXTAREA ---
    // Useremo substitutesArray per avere anche la classe
    if (textOutputElement && data.absent_docent && Array.isArray(substitutesArray)) { //
        let textSummary = `La/Il docente ${data.absent_docent} verrà sostituit*:\n`; //

        // Raggruppiamo i sostituti per ora e classe, perché potrebbero esserci più sostituzioni per la stessa ora ma in classi diverse
        const replacementsByHourAndClass = {};

        substitutesArray.forEach(substitute => { //
            const ora = substitute.ora_sostituzione; //
            const classe = substitute.classe_sostituzione; //
            const docenteSostituto = substitute.docente; //

            if (ora && classe) { // Assicurati che ora e classe siano presenti
                const key = `${ora}-${classe}`; // Chiave unica per ora e classe
                if (!replacementsByHourAndClass[key]) {
                    replacementsByHourAndClass[key] = {
                        ora: ora,
                        classe: classe,
                        sostituti: []
                    };
                }
                if (docenteSostituto) {
                    replacementsByHourAndClass[key].sostituti.push(docenteSostituto);
                }
            }
        });

        // Ora ordiniamo le chiavi per l'output coerente
        const sortedKeys = Object.keys(replacementsByHourAndClass).sort((a, b) => {
            const [oraA, classeA] = a.split('-');
            const [oraB, classeB] = b.split('-');

            const numOraA = parseInt(oraA);
            const numOraB = parseInt(oraB);

            // Ordina prima per ora numerica
            if (!isNaN(numOraA) && !isNaN(numOraB) && numOraA !== numOraB) {
                return numOraA - numOraB;
            }
            // Poi per ora lessicografica (es. "I", "II") se non sono numeriche o sono uguali
            if (oraA !== oraB) {
                return oraA.localeCompare(oraB);
            }
            // Infine per classe lessicografica
            return classeA.localeCompare(classeB);
        });

        sortedKeys.forEach(key => {
            const entry = replacementsByHourAndClass[key];
            if (entry.sostituti.length > 0) {
                textSummary += `alla ${entry.ora} ora in ${entry.classe} da ${entry.sostituti.join(', ')}.\n`;
            } else {
                textSummary += `alla ${entry.ora} ora in ${entry.classe} non ha sostituti disponibili.\n`;
            }
        });

        textOutputElement.value = textSummary;

    } else if (textOutputElement && data.absent_docent) { //
         textOutputElement.value = `Non sono state trovate sostituzioni specifiche per la docente ${data.absent_docent} nelle ore selezionate.`; //
    }
}

// Funzione per resettare i filtri delle sostituzioni
function resetSostituzioniFilters() {
    // Resetta i valori dei dropdown
    const absentDocentSelect = document.getElementById('absent-docent-select');
    if (absentDocentSelect) {
        absentDocentSelect.value = '';
    }

    const absentDaySelect = document.getElementById('absent-day-select');
    if (absentDaySelect) {
        absentDaySelect.value = '';
    }

    // Pulisce l'output della sostituzione
    const messageDiv = document.getElementById('sostituzioni-output-message');
    if (messageDiv) {
        messageDiv.textContent = ''; // Pulisci il messaggio
    }

    const tableContainer = document.getElementById('sostituzioni-table-container'); // Questo è il div contenitore
    if (tableContainer) {
        tableContainer.innerHTML = ''; // Pulisci tutto il contenuto, inclusa la tabella dinamica
    }

    console.log("Filtri sostituzioni resettati."); // Messaggio di debug
}

/**
 * Genera e scarica un PDF con l'orario di un singolo docente.
 * I dati sono estratti dall'orario completo.
 */
async function exportDocentScheduleToPdf() {
    const { jsPDF } = window.jspdf;
    const docentName = document.getElementById('docente-select')?.value;

    if (!docentName) {
        alert("Per favore, seleziona un docente per esportare il suo orario.");
        return;
    }

    const doc = new jsPDF('portrait', 'pt', 'a4');
    let yOffset = 40;
    const margin = 20;

    // Titolo del documento
    doc.setFontSize(18);
    doc.text(`Orario del Docente: ${docentName}`, doc.internal.pageSize.width / 2, yOffset, { align: "center" });
    yOffset += 30;

    // Estrai le lezioni del docente, raggruppandole per giorno
    const docentSchedule = getDocentScheduleByDay(orarioCompletoRaw, docentName);
    const sortedDays = Object.keys(docentSchedule).sort((a, b) => {
        return getGiornoOrder(a) - getGiornoOrder(b);
    });

    // Loop sui giorni
    for (const day of sortedDays) {
        const lessons = docentSchedule[day];
        if (lessons.length === 0) continue;

        // Salto di pagina se non c'è abbastanza spazio per il prossimo blocco
        if (yOffset > doc.internal.pageSize.height - 100) {
            doc.addPage();
            yOffset = 40;
        }

        // Sottotitolo per il giorno
        doc.setFontSize(14);
        doc.text(`${day}`, margin, yOffset);
        yOffset += 20;

        // Prepara i dati per la tabella di jsPDF-AutoTable
        const headers = [['Ora', 'Materia', 'Classe']];
        const body = lessons.map(lesson => [
            lesson.ORA,
            estraeMateriaFrontend(lesson.contenuto_cella),
            estraeClasseDaHeader(lesson.classe_ora)
        ]);

        // Genera la tabella per il giorno corrente
        doc.autoTable({
            startY: yOffset,
            head: headers,
            body: body,
            theme: 'striped',
            styles: { fontSize: 9, cellPadding: 3 },
            margin: { left: margin, right: margin }
        });

        // Aggiorna l'offset Y per la prossima tabella
        yOffset = doc.autoTable.previous.finalY + 20;
    }

    // Salva il PDF
    doc.save(`orario_docente_${docentName}.pdf`);
    alert(`Orario del docente ${docentName} esportato con successo!`);
}

/**
 * Funzione ausiliaria per estrarre le lezioni di un docente e raggrupparle per giorno.
 */
function getDocentScheduleByDay(orarioData, docentName) {
    const schedule = {};
    const docentNameUpper = normalizzaStringa(docentName);

    for (const riga of orarioData) {
        const giorno = normalizzaStringa(riga.GIORNO);
        const ora = riga.ORE;

        // Assicurati che il giorno sia una chiave nell'oggetto
        if (!schedule[giorno]) {
            schedule[giorno] = [];
        }

        // Itera su tutte le classi per trovare le lezioni del docente
        for (const colonna in riga) {
            if (colonna.startsWith('CLASSE')) {
                const contenutoCella = riga[colonna];
                if (typeof contenutoCella === 'string' && contenutoCella.trim()) {
                    const singoleLezioni = contenutoCella.split('-');
                    for (const lezioneStr of singoleLezioni) {
                        const docentiLezione = estraeDocenti(lezioneStr);
                        if (docentiLezione.includes(docentNameUpper)) {
                            schedule[giorno].push({
                                ORA: ora,
                                contenuto_cella: lezioneStr,
                                classe_ora: colonna
                            });
                        }
                    }
                }
            }
        }
    }
    return schedule;
}


/**
 * Esporta le tabelle generate per i filtri generali in un file PDF utilizzando jsPDF-AutoTable.
 * Questo genera tabelle vettoriali per una migliore leggibilità.
 */
async function exportToPdf() {
    const { jsPDF } = window.jspdf; // Ottieni l'oggetto jsPDF dalla finestra

    // Seleziona la sezione che contiene TUTTI i risultati delle tabelle
    const resultsSection = document.getElementById('results-section');

    // Recupera tutti i div che contengono le sezioni delle classi (Prime, Seconde, Terze, Altre)
    const classGroupDivs = resultsSection.querySelectorAll('.class-group-section');

    // Importante: controlla se ci sono risultati visibili PRIMA di procedere
    let hasVisibleTables = false;
    for (const groupDiv of classGroupDivs) {
        const computedStyle = window.getComputedStyle(groupDiv);
        if (computedStyle.display !== 'none') {
            const tableContainer = groupDiv.querySelector('div[id$="-table-container"]');
            if (tableContainer && tableContainer.querySelector('table')) {
                hasVisibleTables = true;
                break;
            }
        }
    }

    if (!hasVisibleTables) {
        alert('Nessun risultato visibile da esportare. Applica prima un filtro che mostri tabelle.');
        return;
    }

    // Inizializza jsPDF
    const doc = new jsPDF('landscape', 'pt', 'a4'); // 'landscape' per orientamento orizzontale, 'pt' per punti, 'a4' per formato carta
    let yOffset = 40; // Offset iniziale dal bordo superiore
    const margin = 20; // Margine laterale
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;
    let firstPage = true;

    // Aggiungi un titolo al documento
    doc.setFontSize(18);
    doc.text("Report Orario Scolastico Filtrato", pageWidth / 2, yOffset, { align: "center" });
    yOffset += 30; // Spazio dopo il titolo

    for (let i = 0; i < classGroupDivs.length; i++) {
        const groupDiv = classGroupDivs[i];

        // Salta i div dei gruppi che non sono visibili
        const computedStyle = window.getComputedStyle(groupDiv);
        if (computedStyle.display === 'none') {
            continue;
        }

        const tableNameElement = groupDiv.querySelector('h3'); // Il titolo del gruppo (es. Classi Prime)
        const tableContainer = groupDiv.querySelector('div[id$="-table-container"]'); // Cerca il div che contiene la tabella
        const tableElement = tableContainer ? tableContainer.querySelector('table') : null; // Trova la tabella al suo interno

        if (!tableElement) {
            console.warn(`Tabella non trovata per il gruppo: ${tableNameElement ? tableNameElement.innerText : 'N/A'}`);
            continue; // Salta se la tabella non è presente
        }

        const tableName = tableNameElement ? tableNameElement.innerText : 'Tabella'; // Nome per il sottotitolo del PDF

        // Non aggiungere una nuova pagina se è la prima e c'è spazio sufficiente
        // Altrimenti, aggiungi una nuova pagina e resetta l'offset
        if (!firstPage && yOffset + 50 > pageHeight - margin) { // 50pt stimati per sottotitolo e inizio tabella
            doc.addPage();
            yOffset = 40; // Reset yOffset per la nuova pagina
        }
        firstPage = false; // Non è più la prima pagina dopo il primo ciclo

        // Aggiungi il nome del gruppo come sottotitolo
        doc.setFontSize(14);
        doc.text(tableName, margin, yOffset);
        yOffset += 20;

        // Estrai intestazioni e dati della tabella dall'HTML per jsPDF-AutoTable
        const headers = Array.from(tableElement.querySelectorAll('thead th')).map(th => th.textContent.trim());
        const bodyRows = Array.from(tableElement.querySelectorAll('tbody tr')).map(tr => {
            return Array.from(tr.querySelectorAll('td')).map(td => td.textContent.trim());
        });

        // Opzioni per autoTable
        const startY = yOffset; // Posizione Y da cui iniziare la tabella
        const tableOptions = {
            startY: startY,
            head: [headers],
            body: bodyRows,
            theme: 'striped', // Tema per la tabella (es. 'striped', 'grid', 'plain')
            styles: {
                fontSize: 8, // Dimensione del font per il contenuto della tabella
                cellPadding: 3,
                valign: 'middle',
                overflow: 'linebreak', // Consente al testo di andare a capo
                cellWidth: 'wrap' // Adatta la larghezza della cella al contenuto
            },
            headStyles: {
                fillColor: [242, 242, 242], // Colore di sfondo dell'intestazione (grigio chiaro)
                textColor: [0, 0, 0], // Colore testo intestazione (nero)
                fontStyle: 'bold',
                fontSize: 9
            },
            columnStyles: {
                // Puoi definire stili specifici per le colonne se necessario
                0: { cellWidth: 'auto' }, // Giorno
                1: { cellWidth: 'auto' }, // Ora
                // Per le colonne delle classi, potresti voler impostare una larghezza minima
                // o lasciare 'auto' e 'wrap' per adattarsi
            },
            margin: { left: margin, right: margin },
            didDrawPage: function(data) {
                // Se la tabella è più lunga di una pagina, aggiunge l'intestazione sulla nuova pagina
                if (data.pageNumber > 1 && data.settings.startY === startY) {
                    doc.setFontSize(10);
                    doc.text(`${tableName} (continua)`, margin, 30); // Continua il sottotitolo
                }
            }
        };

        // Genera la tabella
        doc.autoTable(tableOptions);

        // Aggiorna yOffset dopo aver disegnato la tabella
        // doc.autoTable.previous.finalY ti dà la posizione finale Y della tabella appena disegnata
        yOffset = doc.autoTable.previous.finalY + 20; // Aggiungi spazio tra le tabelle
        console.log(`Added table: ${tableName}, Final Y: ${yOffset}`);
    }

    // Salva il PDF
    doc.save('orario_filtrato_leggibile.pdf');
    alert('PDF generato con successo!');
}