// orarioData.js
// Questo file contiene i dati del tuo orario scolastico, convertiti da CSV a JSON.

const orarioCompletoRaw = [
    {
        "GIORNO": "LUNEDÍ",
        "ORE": "I",
        "CLASSE 1A": "Inglese pot (Rapetta) - Sostegno (Marchi) - Sostegno (Zanolla)",
        "CLASSE 1B": "Scienze (Gaiga) - Compresenza (Altobelli) - Sostegno (Filippozzi)",
        "CLASSE 1C": "Scienze (Salomoni)",
        "CLASSE 2A": "Informatica (Tregnaghi)",
        "CLASSE 2B": "Geografia (Brazzarola)",
        "CLASSE 2C": "Arte (Forte)",
        "CLASSE 2D": "Storia (Mella) - Compresenza (Rizzini)",
        "CLASSE 3A": "Motoria (Bortolazzi)",
        "CLASSE 3B": "Geografia (Spiniella)",
        "CLASSE 3C": "Religione (Negri)"
    },
    {
        "GIORNO": "LUNEDÍ",
        "ORE": "II",
        "CLASSE 1A": "Matematica (Saccomani) - Compresenza (Altobelli) - Compresenza (Bagolin)",
        "CLASSE 1B": "Informatica (Tregnaghi) - Sostegno (Filippozzi)",
        "CLASSE 1C": "Italiano (Boccardi)",
        "CLASSE 2A": "Inglese pot (Inverardi) - Sostegno (Marchi)",
        "CLASSE 2B": "Inglese pot (Giobelli) - Spagnolo (Rapetta)",
        "CLASSE 2C": "Arte (Forte)",
        "CLASSE 2D": "Inglese pot (Giobelli) - Spagnolo (Rapetta)",
        "CLASSE 3A": "Motoria (Bortolazzi)",
        "CLASSE 3B": "Religione (Negri)",
        "CLASSE 3C": "Scienze (Salomoni) - Sostegno (Rizzini) - Sostegno (Zanolla)"
    },
    {
        "GIORNO": "LUNEDÍ",
        "ORE": "III",
        "CLASSE 1A": "Matematica (Saccomani) - Compresenza (Altobelli) - Sostegno (Marchi)",
        "CLASSE 1B": "Geografia (Bagolin) - Sostegno (Filippozzi)",
        "CLASSE 1C": "Italiano (Boccardi)",
        "CLASSE 2A": "Inglese pot (Inverardi)",
        "CLASSE 2B": "Inglese pot (Giobelli) - Spagnolo (Rapetta)",
        "CLASSE 2C": "Religione (Negri)",
        "CLASSE 2D": "Inglese pot (Giobelli) - Spagnolo (Rapetta) - Compresenza (Rizzini)",
        "CLASSE 3A": "Informatica (Tregnaghi) - Compresenza (Forte)",
        "CLASSE 3B": "Italiano (Pasqua)",
        "CLASSE 3C": "Motoria (Bortolazzi) - Sostegno (Zanolla)"
    },
    {
        "GIORNO": "LUNEDÍ",
        "ORE": "IV",
        "CLASSE 1A": "Geografia (Boccardi) - Sostegno (Altobelli) - Sostegno (Marchi) - Sostegno (Zanolla)",
        "CLASSE 1B": "Inglese pot (Inverardi) - spagnolo (Rapetta)",
        "CLASSE 1C": "Inglese pot (Giobelli) - Spagnolo (Rapetta)",
        "CLASSE 2A": "Religione (Negri)",
        "CLASSE 2B": "Storia (Brazzarola)",
        "CLASSE 2C": "Scienze (Saccomani)",
        "CLASSE 2D": "Italiano (Mella) - Compresenza (Rizzini)",
        "CLASSE 3A": "Italiano (Bagolin, Pasqua, Spiniella) - Compresenza (Forte)",
        "CLASSE 3B": "Italiano (Bagolin, Pasqua, Spiniella) - Sostegno (Filippozzi)",
        "CLASSE 3C": "Motoria (Bortolazzi)"
    },
    {
        "GIORNO": "LUNEDÍ",
        "ORE": "V",
        "CLASSE 1A": "Italiano (Spiniella)",
        "CLASSE 1B": "Inglese pot (Inverardi) - spagnolo (Rapetta)",
        "CLASSE 1C": "Inglese pot (Giobelli) - Spagnolo (Rapetta) - Sostegno (Altobelli)",
        "CLASSE 2A": "Matematica (Saccomani) - Sostegno (Marchi)",
        "CLASSE 2B": "Matematica (Gaiga) - Compresenza (Rizzini)",
        "CLASSE 2C": "Geografia (Brazzarola)",
        "CLASSE 2D": "Italiano (Mella) - Compresenza (Bortolazzi)",
        "CLASSE 3A": "Religione (Negri)",
        "CLASSE 3B": "Storia (Pasqua) - Sostegno (Filippozzi)",
        "CLASSE 3C": "Informatica (Tregnaghi)"
    },
    {
        "GIORNO": "LUNEDÍ",
        "ORE": "VI",
        "CLASSE 1A": "Italiano (Spiniella) - Sostegno (Altobelli)",
        "CLASSE 1B": "Storia (Bagolin)",
        "CLASSE 1C": "Storia (Brazzarola)",
        "CLASSE 2A": "Matematica (Saccomani)",
        "CLASSE 2B": "Matematica (Gaiga)",
        "CLASSE 2C": "Informatica (Tregnaghi)",
        "CLASSE 2D": "Religione (Negri)",
        "CLASSE 3A": "Inglese pot (Inverardi, Rapetta) - Inglese ord (Giobelli) - Compresenza (Forte) - Sostegno (Marchi)",
        "CLASSE 3B": "Sostegno (Filippozzi)",
        "CLASSE 3C": "Inglese pot (Inverardi, Rapetta) Inglese ord (Giobelli) - Compresenza (Rizzini) - Sostegno (Zanolla)"
    },
    {
        "GIORNO": "LUNEDÍ",
        "ORE": "VII",
        "CLASSE 1A": "Musica (Compri)",
        "CLASSE 1B": "Arte (Forte)",
        "CLASSE 1C": "Tecnologia (Tregnaghi) - Sostegno (Altobelli) - Sostegno (FIlippozzi)",
        "CLASSE 2A": "Motoria (Bortolazzi)",
        "CLASSE 2B": "Italiano (Pasqua) - Compresenza (Rizzini)",
        "CLASSE 2C": "Italiano (Boccardi)",
        "CLASSE 2D": "Scienze (Gaiga)",
        "CLASSE 3A": "Inglese pot (Inverardi, Rapetta) - Inglese ord (Giobelli) - Sostegno (Marchi)",
        "CLASSE 3B": "Inglese pot (Inverardi, Rapetta) - Inglese ord (Giobelli)",
        "CLASSE 3C": "Inglese pot (Inverardi, Rapetta) Inglese ord (Giobelli)"
    },
    {
        "GIORNO": "LUNEDÍ",
        "ORE": "VIII",
        "CLASSE 1A": "Musica (Compri)",
        "CLASSE 1B": "Arte (Forte)",
        "CLASSE 1C": "Geografia (Pasqua) - Sostegno (Altobelli)",
        "CLASSE 2A": "Motoria (Bortolazzi)",
        "CLASSE 2B": "Religione (Negri)",
        "CLASSE 2C": "Italiano (Boccardi) - Sostegno (Filippozzi)",
        "CLASSE 2D": "Informatica (Tregnaghi)",
        "CLASSE 3A": "Geografia (Mella) - Sostegno (Marchi)",
        "CLASSE 3B": "Scienze (Gaiga)",
        "CLASSE 3C": "Storia (Spiniella) - Compresenza (Rizzini)"
    },
    {
        "GIORNO": "MARTEDÍ",
        "ORE": "I",
        "CLASSE 1A": "Tecnologia (Cappelletti) - Sostegno (Marchi) - Sostegno (Zanolla)",
        "CLASSE 1B": "Italiano (Brazzarola)",
        "CLASSE 1C": "Musica (Compri)",
        "CLASSE 2A": "Inglese pot (Inverardi)",
        "CLASSE 2B": "Inglese pot (Giobelli) - Inglese ord (Rapetta) - Sostegno (Altobelli)",
        "CLASSE 2C": "Italiano (Boccardi) - Sostegno (Filippozzi)",
        "CLASSE 2D": "Inglese pot (Giobelli) - Inglese ord (Rapetta) - Compresenza (Bortolazzi)",
        "CLASSE 3A": "Matematica (Saccomani, Gaiga, Salomoni)",
        "CLASSE 3B": "Matematica (Saccomani, Gaiga, Salomoni) - Sostegno (Filippozzi)",
        "CLASSE 3C": "Italiano (Mella) - Compresenza (Rizzini)"
    },
    {
        "GIORNO": "MARTEDÍ",
        "ORE": "II",
        "CLASSE 1A": "Tecnologia (Cappelletti) - Compresenza (Bagolin)",
        "CLASSE 1B": "Italiano (Brazzarola)",
        "CLASSE 1C": "Musica (Compri)",
        "CLASSE 2A": "Inglese pot (Inverardi) - Sostegno (Marchi)",
        "CLASSE 2B": "Inglese pot (Giobelli) - Inglese ord (Rapetta) - Sostegno (Altobelli) - Compresenza (Rizzini)",
        "CLASSE 2C": "Italiano (Boccardi) - Sostegno (Filippozzi)",
        "CLASSE 2D": "Inglese pot (Giobelli) - Inglese ord (Rapetta) - Compresenza (Bortolazzi)",
        "CLASSE 3A": "Matematica (Saccomani, Gaiga, Salomoni)",
        "CLASSE 3B": "Matematica (Saccomani, Gaiga, Salomoni)",
        "CLASSE 3C": "Italiano (Mella) - Sostegno (Zanolla)"
    },
    {
        "GIORNO": "MARTEDÍ",
        "ORE": "III",
        "CLASSE 1A": "Motoria (Bortolazzi) - Sostegno (Marchi)",
        "CLASSE 1B": "Inglese pot (Inverardi) - Inglese ord (Rapetta) - Sostegno (Filippozzi)",
        "CLASSE 1C": "Inglese potenziato (Giobelli) - Inglese ordinario (Rapetta)",
        "CLASSE 2A": "Geografia (Bagolin)",
        "CLASSE 2B": "Italiano (Pasqua) - Sostegno (Compri)",
        "CLASSE 2C": "Matematica (Saccomani) - Compresenza (Altobelli)",
        "CLASSE 2D": "Matematica (Gaiga) - Compresenza (Rizzini)",
        "CLASSE 3A": "Geografia (Mella)",
        "CLASSE 3B": "Tecnologia (Cappelletti)",
        "CLASSE 3C": "Geografia (Spiniella) - Sostegno (Zanolla)"
    },
    {
        "GIORNO": "MARTEDÍ",
        "ORE": "IV",
        "CLASSE 1A": "Motoria (Bortolazzi) - Sostegno (Marchi)",
        "CLASSE 1B": "Inglese pot (Inverardi) - Inglese ord (Rapetta) - Sostegno (Filippozzi)",
        "CLASSE 1C": "Inglese potenziato (Giobelli) - Inglese ordinario (Rapetta)",
        "CLASSE 2A": "Italiano (Spiniella)",
        "CLASSE 2B": "Italiano (Pasqua) - Sostegno (Compri)",
        "CLASSE 2C": "Matematica (Saccomani) - Compresenza (Altobelli)",
        "CLASSE 2D": "Matematica (Gaiga) - Compresenza (Rizzini)",
        "CLASSE 3A": "Italiano (Bagolin)",
        "CLASSE 3B": "Tecnologia (Cappelletti)",
        "CLASSE 3C": "Matematica (Salomoni) - Sostegno (Zanolla)"
    },
    {
        "GIORNO": "MARTEDÍ",
        "ORE": "V",
        "CLASSE 1A": "Scienze (Saccomani)",
        "CLASSE 1B": "Matematica (Gaiga)",
        "CLASSE 1C": "Italiano (Boccardi) - Compresenza (Altobelli)",
        "CLASSE 2A": "Tecnologia (Cappelletti)",
        "CLASSE 2B": "Motoria (Bortolazzi) - Sostegno (Compri)",
        "CLASSE 2C": "Geografia (Brazzarola)",
        "CLASSE 2D": "Italiano (Mella) - Compresenza (Rizzini)",
        "CLASSE 3A": "Italiano (Bagolin) - Sostegno (Marchi)",
        "CLASSE 3B": "Geografia (Spiniella) - Sostegno (Filippozzi)",
        "CLASSE 3C": "Matematica (Salomoni) - Sostegno (Zanolla)"
    },
    {
        "GIORNO": "MARTEDÍ",
        "ORE": "VI",
        "CLASSE 1A": "Italiano (Spiniella)",
        "CLASSE 1B": "Matematica (Gaiga) - Sostegno (Filippozzi)",
        "CLASSE 1C": "Italiano (Boccardi)",
        "CLASSE 2A": "Tecnologia (Cappelletti) - Sostegno (Marchi)",
        "CLASSE 2B": "Motoria (Bortolazzi) - Sostegno (Altobelli)",
        "CLASSE 2C": "Storia (Brazzarola)",
        "CLASSE 2D": "Italiano (Mella) - Compresenza (Rizzini)",
        "CLASSE 3A": "Inglese pot (Inverardi, Rapetta) - Inglese ord (Giobelli) - Compresenza (Forte)",
        "CLASSE 3B": "Geografia (Spiniella)",
        "CLASSE 3C": "Inglese pot (Inverardi, Rapetta) Inglese ord (Giobelli)"
    },
    {
        "GIORNO": "MERCOLEDÍ",
        "ORE": "I",
        "CLASSE 1A": "Matematica (Saccomani)",
        "CLASSE 1B": "Italiano (Brazzarola)",
        "CLASSE 1C": "Scienze (Salomoni)",
        "CLASSE 2A": "Italiano (Spiniella)",
        "CLASSE 2B": "Italiano (Pasqua)",
        "CLASSE 2C": "Musica (Ferronato)",
        "CLASSE 2D": "Scienze (Gaiga)",
        "CLASSE 3A": "Arte (Forte)",
        "CLASSE 3B": "Informatica (Tregnaghi)",
        "CLASSE 3C": "Musica (Compri)"
    },
    {
        "GIORNO": "MERCOLEDÍ",
        "ORE": "II",
        "CLASSE 1A": "Matematica (Saccomani)",
        "CLASSE 1B": "Italiano (Brazzarola)",
        "CLASSE 1C": "Tecnologia (Tregnaghi)",
        "CLASSE 2A": "Italiano (Spiniella)",
        "CLASSE 2B": "Italiano (Pasqua)",
        "CLASSE 2C": "Musica (Ferronato)",
        "CLASSE 2D": "Italiano (Mella, Bagolin)",
        "CLASSE 3A": "Arte (Forte)",
        "CLASSE 3B": "Scienze (Gaiga)",
        "CLASSE 3C": "Musica (Compri)"
    },
    {
        "GIORNO": "MERCOLEDÍ",
        "ORE": "III",
        "CLASSE 1A": "Informatica (Tregnaghi)",
        "CLASSE 1B": "Religione (Brazzarola)",
        "CLASSE 1C": "Tecnologia (Tregnaghi)",
        "CLASSE 2A": "Scienze (Saccomani)",
        "CLASSE 2B": "Scienze (Gaiga)",
        "CLASSE 2C": "Inglese pot (Rapetta)",
        "CLASSE 2D": "Arte (Forte)",
        "CLASSE 3A": "Storia (Pasqua)",
        "CLASSE 3B": "Musica (Ferronato)",
        "CLASSE 3C": "Scienze (Salomoni)"
    },
    {
        "GIORNO": "MERCOLEDÍ",
        "ORE": "IV",
        "CLASSE 1A": "Religione (Brazzarola)",
        "CLASSE 1B": "Geografia (Bagolin)",
        "CLASSE 1C": "Italiano (Boccardi)",
        "CLASSE 2A": "Inglese pot (Inverardi)",
        "CLASSE 2B": "Informatica (Tregnaghi)",
        "CLASSE 2C": "Inglese pot (Rapetta)",
        "CLASSE 2D": "Arte (Forte)",
        "CLASSE 3A": "Scienze (Saccomani)",
        "CLASSE 3B": "Musica (Ferronato)",
        "CLASSE 3C": "Storia (Spiniella)"
    },
    {
        "GIORNO": "MERCOLEDÍ",
        "ORE": "V",
        "CLASSE 1A": "Inglese pot (Rapetta)",
        "CLASSE 1B": "Motoria (Bortolazzi)",
        "CLASSE 1C": "Religione (Brazzarola)",
        "CLASSE 2A": "Musica (Ferronato)",
        "CLASSE 2B": "Arte (Forte)",
        "CLASSE 2C": "Tecnologia (Cappelletti)",
        "CLASSE 2D": "Tecnologia (Tregnaghi)",
        "CLASSE 3A": "Italiano (Bagolin, Pasqua, Spiniella)",
        "CLASSE 3B": "Italiano (Bagolin, Pasqua, Spiniella)",
        "CLASSE 3C": "Italiano (Mella)"
    },
    {
        "GIORNO": "MERCOLEDÍ",
        "ORE": "VI",
        "CLASSE 1A": "Inglese pot (Rapetta)",
        "CLASSE 1B": "Motoria (Bortolazzi)",
        "CLASSE 1C": "Storia (Brazzarola)",
        "CLASSE 2A": "Musica (Ferronato)",
        "CLASSE 2B": "Arte (Forte)",
        "CLASSE 2C": "Tecnologia (Cappelletti)",
        "CLASSE 2D": "Tecnologia (Tregnaghi)",
        "CLASSE 3A": "Italiano (Bagolin)",
        "CLASSE 3B": "Storia(Pasqua)",
        "CLASSE 3C": "Geografia (Spiniella)"
    },
    {
        "GIORNO": "GIOVEDÍ",
        "ORE": "I",
        "CLASSE 1A": "Scienze (Saccomani)",
        "CLASSE 1B": "Scienze (Gaiga)",
        "CLASSE 1C": "Matematica (Salomoni)",
        "CLASSE 2A": "Italiano (Spiniella)",
        "CLASSE 2B": "Geografia (Brazzarola)",
        "CLASSE 2C": "Italiano (Boccardi)",
        "CLASSE 2D": "Geografia (Mella)",
        "CLASSE 3A": "Tecnologia (Cappelletti)",
        "CLASSE 3B": "Italiano (Pasqua)",
        "CLASSE 3C": "Arte (Forte)"
    },
    {
        "GIORNO": "GIOVEDÍ",
        "ORE": "II",
        "CLASSE 1A": "Storia (Boccardi)",
        "CLASSE 1B": "Storia (Bagolin)",
        "CLASSE 1C": "Matematica (Salomoni)",
        "CLASSE 2A": "Italiano (Spiniella)",
        "CLASSE 2B": "Inglese pot (Giobelli) - Inglese ord (Rapetta)",
        "CLASSE 2C": "Scienze (Saccomani)",
        "CLASSE 2D": "Inglese pot (Giobelli) - Inglese ord (Rapetta)",
        "CLASSE 3A": "Tecnologia (Cappelletti)",
        "CLASSE 3B": "Italiano (Pasqua)",
        "CLASSE 3C": "Arte (Forte)"
    },
    {
        "GIORNO": "GIOVEDÍ",
        "ORE": "III",
        "CLASSE 1A": "Italiano (Spiniella)",
        "CLASSE 1B": "Italiano (Brazzarola)",
        "CLASSE 1C": "Geografia (Pasqua)",
        "CLASSE 2A": "Storia (Boccardi)",
        "CLASSE 2B": "Tecnologia (Cappelletti)",
        "CLASSE 2C": "Inglese pot (Rapetta)",
        "CLASSE 2D": "Musica (Compri)",
        "CLASSE 3A": "Matematica (Saccomani, Gaiga, Salomoni)",
        "CLASSE 3B": "Matematica (Saccomani, Gaiga, Salomoni)",
        "CLASSE 3C": "Italiano (Mella)"
    },
    {
        "GIORNO": "GIOVEDÍ",
        "ORE": "IV",
        "CLASSE 1A": "Italiano (Spiniella)",
        "CLASSE 1B": "Inglese pot (Inverardi) - Inglese ord (Rapetta)",
        "CLASSE 1C": "Inglese pot (Giobelli) - Inglese ord (Rapetta)",
        "CLASSE 2A": "Geografia (Bagolin)",
        "CLASSE 2B": "Tecnologia (Cappelletti)",
        "CLASSE 2C": "Italiano (Boccardi)",
        "CLASSE 2D": "Musica (Compri)",
        "CLASSE 3A": "Matematica (Saccomani, Gaiga, Salomoni)",
        "CLASSE 3B": "Matematica (Saccomani, Gaiga, Salomoni)",
        "CLASSE 3C": "Italiano (Mella)"
    },
    {
        "GIORNO": "GIOVEDÍ",
        "ORE": "V",
        "CLASSE 1A": "Arte (Forte)",
        "CLASSE 1B": "Tecnologia (Cappelletti)",
        "CLASSE 1C": "Italiano (Boccardi)",
        "CLASSE 2A": "Matematica (Saccomani)",
        "CLASSE 2B": "Matematica (Gaiga)",
        "CLASSE 2C": "Motoria (Bortolazzi)",
        "CLASSE 2D": "Italiano (Mella, Bagolin)",
        "CLASSE 3A": "Inglese pot (Inverardi, Rapetta) - Tedesco (Giobelli) - Spagnolo (Fattori)",
        "CLASSE 3B": "Inglese pot (Inverardi, Rapetta) - Tedesco (Giobelli) - Spagnolo (Fattori)",
        "CLASSE 3C": "Inglese pot (Inverardi, Rapetta) - Spagnolo (Fattori)"
    },
    {
        "GIORNO": "GIOVEDÍ",
        "ORE": "VI",
        "CLASSE 1A": "Arte (Forte)",
        "CLASSE 1B": "Tecnologia (Cappelletti)",
        "CLASSE 1C": "Italiano (Boccardi)",
        "CLASSE 2A": "Matematica (Saccomani)",
        "CLASSE 2B": "Matematica (Gaiga)",
        "CLASSE 2C": "Motoria (Bortolazzi)",
        "CLASSE 2D": "Italiano (Mella, Bagolin)",
        "CLASSE 3A": "Inglese pot (Inverardi, Rapetta) - Tedesco (Giobelli) - Spagnolo (Fattori)",
        "CLASSE 3B": "Inglese pot (Inverardi, Rapetta) - Tedesco (Giobelli) - Spagnolo (Fattori)",
        "CLASSE 3C": "Inglese pot (Inverardi, Rapetta) - Spagnolo (Fattori)"
    },
    {
        "GIORNO": "VENERDÍ",
        "ORE": "I",
        "CLASSE 1A": "Inglese pot (Rapetta)",
        "CLASSE 1B": "Musica (Compri)",
        "CLASSE 1C": "Arte (Forte)",
        "CLASSE 2A": "Italiano (Spiniella)",
        "CLASSE 2B": "Scienze (Gaiga)",
        "CLASSE 2C": "Storia (Brazzarola)",
        "CLASSE 2D": "Storia (Mella)",
        "CLASSE 3A": "Musica (Ferronato)",
        "CLASSE 3B": "Motoria (Bortolazzi)",
        "CLASSE 3C": "Matematica (Salomoni)"
    },
    {
        "GIORNO": "VENERDÍ",
        "ORE": "II",
        "CLASSE 1A": "Inglese pot (Rapetta)",
        "CLASSE 1B": "Musica (Compri)",
        "CLASSE 1C": "Arte (Forte)",
        "CLASSE 2A": "Italiano (Spiniella)",
        "CLASSE 2B": "Italiano (Pasqua)",
        "CLASSE 2C": "Italiano (Boccardi)",
        "CLASSE 2D": "Geografia (Mella)",
        "CLASSE 3A": "Musica (Ferronato)",
        "CLASSE 3B": "Motoria (Bortolazzi)",
        "CLASSE 3C": "Matematica (Salomoni)"
    },
    {
        "GIORNO": "VENERDÍ",
        "ORE": "III",
        "CLASSE 1A": "Italiano (Spiniella)",
        "CLASSE 1B": "Italiano (Brazzarola)",
        "CLASSE 1C": "Motoria (Bortolazzi)",
        "CLASSE 2A": "Storia (Boccardi)",
        "CLASSE 2B": "Italiano (Pasqua)",
        "CLASSE 2C": "Inglese pot (Rapetta)",
        "CLASSE 2D": "Matematica (Gaiga)",
        "CLASSE 3A": "Scienze (Saccomani)",
        "CLASSE 3B": "Arte (Forte)",
        "CLASSE 3C": "Italiano (Mella)"
    },
    {
        "GIORNO": "VENERDÍ",
        "ORE": "IV",
        "CLASSE 1A": "Italiano (Spiniella)",
        "CLASSE 1B": "Italiano (Brazzarola)",
        "CLASSE 1C": "Motoria (Bortolazzi)",
        "CLASSE 2A": "Scienze (Saccomani)",
        "CLASSE 2B": "Musica (Compri)",
        "CLASSE 2C": "Inglese pot (Rapetta)",
        "CLASSE 2D": "Matematica (Gaiga)",
        "CLASSE 3A": "Storia (Pasqua)",
        "CLASSE 3B": "Arte (Forte)",
        "CLASSE 3C": "Italiano (Mella)"
    },
    {
        "GIORNO": "VENERDÍ",
        "ORE": "V",
        "CLASSE 1A": "Geografia (Boccardi)",
        "CLASSE 1B": "Matematica (Gaiga)",
        "CLASSE 1C": "Matematica (Salomoni)",
        "CLASSE 2A": "Arte (Forte)",
        "CLASSE 2B": "Musica (Compri)",
        "CLASSE 2C": "Matematica (Saccomani)",
        "CLASSE 2D": "Motoria (Bortolazzi)",
        "CLASSE 3A": "Italiano (Bagolin)",
        "CLASSE 3B": "Italiano (Pasqua)",
        "CLASSE 3C": "Tecnologia (Cappelletti)"
    },
    {
        "GIORNO": "VENERDÍ",
        "ORE": "VI",
        "CLASSE 1A": "Storia (Boccardi)",
        "CLASSE 1B": "Matematica (Gaiga)",
        "CLASSE 1C": "Matematica (Salomoni)",
        "CLASSE 2A": "Arte (Forte)",
        "CLASSE 2B": "Storia (Brazzarola)",
        "CLASSE 2C": "Matematica (Saccomani)",
        "CLASSE 2D": "Motoria (Bortolazzi)",
        "CLASSE 3A": "Italiano (Bagolin)",
        "CLASSE 3B": "Italiano (Pasqua)",
        "CLASSE 3C": "Tecnologia (Cappelletti)"
    }
];

// Funzione per ricavare le intestazioni delle classi dal dataset completo
function getClassHeaders(orarioData) {
    if (!orarioData || orarioData.length === 0) {
        return [];
    }
    // Prende le chiavi dalla prima riga e filtra quelle che iniziano con 'CLASSE'
    const headers = Object.keys(orarioData[0]).filter(key => key.startsWith('CLASSE'));
    return headers.sort(); // Restituisce le intestazioni ordinate
}

// Global variable per le intestazioni delle classi (equivalente a class_headers_caricati in Python)
const globalClassHeaders = getClassHeaders(orarioCompletoRaw);

// Mappa delle ore per calcoli di vicinanza
const ORA_MAPPING = {
    'I': 1, 'II': 2, 'III': 3, 'IV': 4, 'V': 5,
    'VI': 6, 'VII': 7, 'VIII': 8, 'IX': 9, 'X': 10, // Ho mantenuto fino a X per flessibilità, anche se i tuoi dati arrivano fino a VIII
    'VII': 7, 'VIII': 8 // Assicurati che tutte le ore usate nel tuo CSV siano mappate
};

// Ordine specifico dei giorni per l'ordinamento
const GIORNI_ORDINAMENTO = ["LUNEDÍ", "MARTEDÍ", "MERCOLEDÍ", "GIOVEDÍ", "VENERDÍ", "SABATO", "DOMENICA"];

// Questa mappa inversa è utile se dobbiamo convertire numeri in stringhe di ora
const REVERSE_ORA_MAPPING = {};
for (const key in ORA_MAPPING) {
    if (ORA_MAPPING.hasOwnProperty(key)) {
        REVERSE_ORA_MAPPING[ORA_MAPPING[key]] = key;
    }
}

function getOraNumericValue(oraStr) {
    return ORA_MAPPING[normalizzaStringa(oraStr)] || null;
}

function getOraStringValue(oraNum) {
    return REVERSE_ORA_MAPPING[oraNum] || null;
}