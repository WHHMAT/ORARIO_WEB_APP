const orarioCompletoRaw = [
    {
        "GIORNO": "LUNEDÍ",
        "ORE": "I",
        "CLASSE 1A": "Arte (Forte)",
        "CLASSE 1B": "Religione (Brazzarola)",
        "CLASSE 1C": "Sc. Motorie (Bortolazzi)",
        "CLASSE 1D": "Tecno (Cappelletti)",
        "CLASSE 2A": "Italiano (Spiniella) - Compresenza (Filippozzi)",
        "CLASSE 2B": "Info (Ferrari V.)",
        "CLASSE 2C": "Geografia (Pasqua)",
        "CLASSE 3A": "Religione (Negri)",
        "CLASSE 3B": "Matematica (Gaiga, Saccomani) - Compresenza (Salomoni)",
        "CLASSE 3C": "Italiano (Boccardi) - Recupero (Mella)",
        "CLASSE 3D": "Matematica (Gaiga, Saccomani) - Compresenza (Salomoni)"
    },
    {
        "GIORNO": "LUNEDÍ",
        "ORE": "II",
        "CLASSE 1A": "Arte (Forte)",
        "CLASSE 1B": "Geografia (Pasqua)",
        "CLASSE 1C": "Sc. Motorie (Bortolazzi)",
        "CLASSE 1D": "Tecno (Cappelletti)",
        "CLASSE 2A": "Italiano (Spiniella) - Compresenza (Filippozzi)",
        "CLASSE 2B": "Inglese pot (Inverardi) - Inglese ord (Rapetta)",
        "CLASSE 2C": "Inglese pot (Marchetto) - Inglese ord (Rapetta)",
        "CLASSE 3A": "Geografia (Mella)",
        "CLASSE 3B": "Matematica (Gaiga, Saccomani) - Compresenza (Salomoni)",
        "CLASSE 3C": "Italiano (Boccardi)",
        "CLASSE 3D": "Matematica (Gaiga, Saccomani) - Compresenza (Salomoni)"
    },
    {
        "GIORNO": "LUNEDÍ",
        "ORE": "III",
        "CLASSE 1A": "Scienze (Saccomani)",
        "CLASSE 1B": "Inglese pot (Marchetto)",
        "CLASSE 1C": "Italiano (Mella)",
        "CLASSE 1D": "Storia (Filippozzi)",
        "CLASSE 2A": "Storia (Boccardi)",
        "CLASSE 2B": "Scienze (Gaiga)",
        "CLASSE 2C": "Religione (Negri)",
        "CLASSE 3A": "Italiano (Spiniella) - Recupero (Pasqua)",
        "CLASSE 3B": "Storia (Brazzarola)",
        "CLASSE 3C": "Tecno (Ferrari V.)",
        "CLASSE 3D": "Sc. Motorie (Bortolazzi)"
    },
    {
        "GIORNO": "LUNEDÍ",
        "ORE": "IV",
        "CLASSE 1A": "Italiano (Spiniella)",
        "CLASSE 1B": "Matematica (Gaiga)",
        "CLASSE 1C": "Italiano (Mella)",
        "CLASSE 1D": "Geografia (Filippozzi)",
        "CLASSE 2A": "Inglese pot (Rapetta) - Compresenza (Marchetto)",
        "CLASSE 2B": "Storia (Pasqua)",
        "CLASSE 2C": "Italiano (Boccardi)",
        "CLASSE 3A": "Scienze (Saccomani)",
        "CLASSE 3B": "Religione (Negri)",
        "CLASSE 3C": "Tecno (Ferrari V.)",
        "CLASSE 3D": "Sc. Motorie (Bortolazzi)"
    },
    {
        "GIORNO": "LUNEDÍ",
        "ORE": "V",
        "CLASSE 1A": "Italiano (Spiniella)",
        "CLASSE 1B": "Matematica (Gaiga)",
        "CLASSE 1C": "Inglese pot (Marchetto)",
        "CLASSE 1D": "Italiano (Filippozzi)",
        "CLASSE 2A": "Scienze (Saccomani)",
        "CLASSE 2B": "Italiano (Brazzarola)",
        "CLASSE 2C": "Arte (Forte)",
        "CLASSE 3A": "Tecno (Ferrari V.)",
        "CLASSE 3B": "Inglese pot (Inverardi) - Spagnolo (Rapetta)",
        "CLASSE 3C": "Religione (Negri)",
        "CLASSE 3D": "Inglese pot (Inverardi) - Spagnolo (Rapetta)"
    },
    {
        "GIORNO": "LUNEDÍ",
        "ORE": "VI",
        "CLASSE 1A": "Geografia (Mella)",
        "CLASSE 1B": "Italiano (Pasqua)",
        "CLASSE 1C": "Inglese pot (Marchetto)",
        "CLASSE 1D": "Italiano (Filippozzi)",
        "CLASSE 2A": "Religione (Negri)",
        "CLASSE 2B": "Italiano (Brazzarola)",
        "CLASSE 2C": "Arte (Forte)",
        "CLASSE 3A": "Tecno (Ferrari V.)",
        "CLASSE 3B": "Inglese pot (Inverardi) - Spagnolo (Rapetta)",
        "CLASSE 3C": "Scienze (Saccomani)",
        "CLASSE 3D": "Inglese pot (Inverardi) - Spagnolo (Rapetta)"
    },
    {
        "GIORNO": "LUNEDÍ",
        "ORE": "VII",
        "CLASSE 1A": "Musica (Ferronato)",
        "CLASSE 1B": "Italiano (Pasqua)",
        "CLASSE 1C": "Geografia (Filippozzi)",
        "CLASSE 1D": "Sc. Motorie (Bortolazzi)",
        "CLASSE 2A": "Musica (Compri)",
        "CLASSE 2B": "Religione (Negri)",
        "CLASSE 2C": "Scienze (Salomoni)",
        "CLASSE 3A": "Inglese pot (Inverardi)",
        "CLASSE 3B": "Arte (Forte)",
        "CLASSE 3C": "Inglese pot (Rapetta)",
        "CLASSE 3D": "Info (Tregnaghi)"
    },
    {
        "GIORNO": "LUNEDÍ",
        "ORE": "VIII",
        "CLASSE 1A": "Musica (Ferronato)",
        "CLASSE 1B": "Storia (Pasqua)",
        "CLASSE 1C": "Scienze (Salomoni)",
        "CLASSE 1D": "Sc. Motorie (Bortolazzi)",
        "CLASSE 2A": "Musica (Compri)",
        "CLASSE 2B": "Geografia (Brazzarola)",
        "CLASSE 2C": "Info (Tregnaghi)",
        "CLASSE 3A": "Inglese pot (Inverardi)",
        "CLASSE 3B": "Arte (Forte)",
        "CLASSE 3C": "Inglese pot (Rapetta)",
        "CLASSE 3D": "Religione (Negri)"
    },
    {
        "GIORNO": "MARTEDÍ",
        "ORE": "I",
        "CLASSE 1A": "Religione (Brazzarola)",
        "CLASSE 1B": "Matematica (Gaiga)",
        "CLASSE 1C": "Matematica (Salomoni)",
        "CLASSE 1D": "Italiano (Filippozzi)",
        "CLASSE 2A": "Matematica (Saccomani) - Compresenza (Altobelli)",
        "CLASSE 2B": "Musica (Compri)",
        "CLASSE 2C": "Tecno (Tregnaghi)",
        "CLASSE 3A": "Sc. Motorie (Bortolazzi)",
        "CLASSE 3B": "Italiano (Pasqua) - Compresenza (Spiniella)",
        "CLASSE 3C": "Italiano (Boccardi)",
        "CLASSE 3D": "Arte (Forte)"
    },
    {
        "GIORNO": "MARTEDÍ",
        "ORE": "II",
        "CLASSE 1A": "Inglese pot (Marchetto) - Inglese ord (Inverardi)",
        "CLASSE 1B": "Matematica (Gaiga)",
        "CLASSE 1C": "Matematica (Salomoni)",
        "CLASSE 1D": "Inglese pot (Marchetto) - Inglese ord (Inverardi)",
        "CLASSE 2A": "Matematica (Saccomani) - Compresenza (Altobelli)",
        "CLASSE 2B": "Musica (Compri)",
        "CLASSE 2C": "Tecno (Tregnaghi)",
        "CLASSE 3A": "Sc. Motorie (Bortolazzi)",
        "CLASSE 3B": "Geografia (Brazzarola)",
        "CLASSE 3C": "Italiano (Boccardi)",
        "CLASSE 3D": "Arte (Forte)"
    },
    {
        "GIORNO": "MARTEDÍ",
        "ORE": "III",
        "CLASSE 1A": "Italiano (Spiniella)",
        "CLASSE 1B": "Inglese pot (Marchetto)",
        "CLASSE 1C": "Musica (Compri)",
        "CLASSE 1D": "Religione (Brazzarola)",
        "CLASSE 2A": "Inglese pot (Rapetta)",
        "CLASSE 2B": "Sc. Motorie (Bortolazzi)",
        "CLASSE 2C": "Scienze (Salomoni)",
        "CLASSE 3A": "Matematica (Saccomani, Gaiga) - Compresenza (Altobelli)",
        "CLASSE 3B": "Tecno (Ferrari V.)",
        "CLASSE 3C": "Matematica (Saccomani, Gaiga) - Compresenza (Altobelli)",
        "CLASSE 3D": "Tecno (Tregnaghi)"
    },
    {
        "GIORNO": "MARTEDÍ",
        "ORE": "IV",
        "CLASSE 1A": "Italiano (Spiniella)",
        "CLASSE 1B": "Inglese pot (Marchetto)",
        "CLASSE 1C": "Musica (Compri)",
        "CLASSE 1D": "Matematica (Salomoni)",
        "CLASSE 2A": "Inglese pot (Rapetta)",
        "CLASSE 2B": "Sc. Motorie (Bortolazzi)",
        "CLASSE 2C": "Storia  (Brazzarola)",
        "CLASSE 3A": "Matematica (Saccomani, Gaiga) - Compresenza (Altobelli)",
        "CLASSE 3B": "Tecno (Ferrari V.)",
        "CLASSE 3C": "Matematica (Saccomani, Gaiga) - Compresenza (Altobelli)",
        "CLASSE 3D": "Tecno (Tregnaghi)"
    },
    {
        "GIORNO": "MARTEDÍ",
        "ORE": "V",
        "CLASSE 1A": "Matematica (Saccomani)",
        "CLASSE 1B": "Italiano (Pasqua)",
        "CLASSE 1C": "Italiano (Mella)",
        "CLASSE 1D": "Matematica (Salomoni)",
        "CLASSE 2A": "Arte (Forte)",
        "CLASSE 2B": "Inglese pot (Inverardi) - Spagnolo (Rapetta)",
        "CLASSE 2C": "Inglese pot (Marchetto) - Spagnolo (Rapetta)",
        "CLASSE 3A": "Italiano (Spiniella)",
        "CLASSE 3B": "Scienze (Gaiga)",
        "CLASSE 3C": "Sc. Motorie (Bortolazzi)",
        "CLASSE 3D": "Musica (Compri)"
    },
    {
        "GIORNO": "MARTEDÍ",
        "ORE": "VI",
        "CLASSE 1A": "Matematica (Saccomani)",
        "CLASSE 1B": "Italiano (Pasqua)",
        "CLASSE 1C": "Italiano (Mella)",
        "CLASSE 1D": "Storia (Filippozzi)",
        "CLASSE 2A": "Arte (Forte)",
        "CLASSE 2B": "Inglese pot (Inverardi) - Spagnolo (Rapetta)",
        "CLASSE 2C": "Inglese pot (Marchetto) - Spagnolo (Rapetta)",
        "CLASSE 3A": "Italiano (Spiniella)",
        "CLASSE 3B": "Storia (Brazzarola)",
        "CLASSE 3C": "Sc. Motorie (Bortolazzi)",
        "CLASSE 3D": "Musica (Compri)"
    },
    {
        "GIORNO": "MERCOLEDÍ",
        "ORE": "I",
        "CLASSE 1A": "Sc. Motorie (Bortolazzi)",
        "CLASSE 1B": "Tecno (Ferrari V.)",
        "CLASSE 1C": "Arte (Forte)",
        "CLASSE 1D": "Italiano (Filippozzi)",
        "CLASSE 2A": "Inglese pot (Rapetta)",
        "CLASSE 2B": "Matematica (Gaiga) - Recupero (Saccomani)",
        "CLASSE 2C": "Matematica (Salomoni) - Recupero (Saccomani)",
        "CLASSE 3A": "Inglese pot (Inverardi)",
        "CLASSE 3B": "Italiano (Pasqua) - Recupero (Boccardi)",
        "CLASSE 3C": "Storia (Brazzarola)",
        "CLASSE 3D": "Geografia (Mella)"
    },
    {
        "GIORNO": "MERCOLEDÍ",
        "ORE": "II",
        "CLASSE 1A": "Sc. Motorie (Bortolazzi)",
        "CLASSE 1B": "Tecno (Ferrari V.)",
        "CLASSE 1C": "Arte (Forte)",
        "CLASSE 1D": "Italiano (Filippozzi)",
        "CLASSE 2A": "Inglese pot (Rapetta) - Compresenza (Marchetto)",
        "CLASSE 2B": "Matematica (Gaiga) - Recupero (Saccomani)",
        "CLASSE 2C": "Matematica (Salomoni) - Recupero (Saccomani)",
        "CLASSE 3A": "Italiano (Spiniella)",
        "CLASSE 3B": "Italiano (Pasqua)",
        "CLASSE 3C": "Geografia (Brazzarola)",
        "CLASSE 3D": "Italiano (Mella) - Compresenza (Boccardi)"
    },
    {
        "GIORNO": "MERCOLEDÍ",
        "ORE": "III",
        "CLASSE 1A": "Scienze (Saccomani)",
        "CLASSE 1B": "Scienze (Gaiga)",
        "CLASSE 1C": "Storia (Filippozzi)",
        "CLASSE 1D": "Scienze (Salomoni)",
        "CLASSE 2A": "Info (Ferrari V.)",
        "CLASSE 2B": "Arte (Forte)",
        "CLASSE 2C": "Musica (Compri)",
        "CLASSE 3A": "Italiano (Spiniella) - Recupero (Pasqua)",
        "CLASSE 3B": "Inglese pot (Inverardi) - Inglese ord (Rapetta)",
        "CLASSE 3C": "Italiano (Boccardi) - Recupero (Mella)",
        "CLASSE 3D": "Inglese pot (Inverardi) - Inglese ord (Rapetta)"
    },
    {
        "GIORNO": "MERCOLEDÍ",
        "ORE": "IV",
        "CLASSE 1A": "Inglese pot (Marchetto) - Inglese ord (Inverardi)",
        "CLASSE 1B": "Storia (Pasqua)",
        "CLASSE 1C": "Tecno (Ferrari V.)",
        "CLASSE 1D": "Inglese pot (Marchetto) - Inglese ord (Inverardi)",
        "CLASSE 2A": "Italiano (Spiniella) - Compresenza (Filippozzi)",
        "CLASSE 2B": "Arte (Forte)",
        "CLASSE 2C": "Musica (Compri)",
        "CLASSE 3A": "Storia (Boccardi)",
        "CLASSE 3B": "Geografia (Brazzarola)",
        "CLASSE 3C": "Scienze (Saccomani)",
        "CLASSE 3D": "Italiano (Mella)"
    },
    {
        "GIORNO": "MERCOLEDÍ",
        "ORE": "V",
        "CLASSE 1A": "Inglese pot (Marchetto) - Inglese ord (Inverardi)",
        "CLASSE 1B": "Italiano (Pasqua)",
        "CLASSE 1C": "Tecno (Ferrari V.)",
        "CLASSE 1D": "Inglese pot (Marchetto) - Inglese ord (Inverardi)",
        "CLASSE 2A": "Italiano (Spiniella) - Compresenza (Filippozzi)",
        "CLASSE 2B": "Italiano (Brazzarola)",
        "CLASSE 2C": "Italiano (Boccardi)",
        "CLASSE 3A": "Scienze (Saccomani)",
        "CLASSE 3B": "Musica (Compri)",
        "CLASSE 3C": "Arte (Forte)",
        "CLASSE 3D": "Italiano (Mella)"
    },
    {
        "GIORNO": "MERCOLEDÍ",
        "ORE": "VI",
        "CLASSE 1A": "Geografia (Mella)",
        "CLASSE 1B": "Italiano (Pasqua)",
        "CLASSE 1C": "Geografia (Filippozzi)",
        "CLASSE 1D": "Info (Cappelletti)",
        "CLASSE 2A": "Scienze (Saccomani)",
        "CLASSE 2B": "Italiano (Brazzarola) - Recupero (Spiniella)",
        "CLASSE 2C": "Italiano (Boccardi)",
        "CLASSE 3A": "Info (Ferrari V.)",
        "CLASSE 3B": "Musica (Compri)",
        "CLASSE 3C": "Arte (Forte)",
        "CLASSE 3D": "Scienze (Gaiga)"
    },
    {
        "GIORNO": "GIOVEDÍ",
        "ORE": "I",
        "CLASSE 1A": "Italiano (Spiniella)",
        "CLASSE 1B": "Italiano (Pasqua)",
        "CLASSE 1C": "Info (Ferrari V.)",
        "CLASSE 1D": "Musica (Compri)",
        "CLASSE 2A": "Matematica (Saccomani) - Compresenza (Altobelli)",
        "CLASSE 2B": "Scienze (Gaiga)",
        "CLASSE 2C": "Italiano (Boccardi) - Recupero (Filippozzi)",
        "CLASSE 3A": "Inglese pot (Inverardi)",
        "CLASSE 3B": "Sc. Motorie (Bortolazzi)",
        "CLASSE 3C": "Storia (Brazzarola)",
        "CLASSE 3D": "Geografia (Mella)"
    },
    {
        "GIORNO": "GIOVEDÍ",
        "ORE": "II",
        "CLASSE 1A": "Italiano (Spiniella)",
        "CLASSE 1B": "Inglese pot (Marchetto)",
        "CLASSE 1C": "Scienze (Salomoni)",
        "CLASSE 1D": "Musica (Compri)",
        "CLASSE 2A": "Matematica (Saccomani) - Compresenza (Altobelli)",
        "CLASSE 2B": "Storia (Pasqua)",
        "CLASSE 2C": "Italiano (Boccardi) - Recupero (Filippozzi)",
        "CLASSE 3A": "Inglese pot (Inverardi)",
        "CLASSE 3B": "Sc. Motorie (Bortolazzi)",
        "CLASSE 3C": "Info (Ferrari V.)",
        "CLASSE 3D": "Storia (Mella)"
    },
    {
        "GIORNO": "GIOVEDÍ",
        "ORE": "III",
        "CLASSE 1A": "Info (Ferrari V.)",
        "CLASSE 1B": "Inglese pot (Marchetto)",
        "CLASSE 1C": "Storia (Filippozzi)",
        "CLASSE 1D": "Matematica (Salomoni)",
        "CLASSE 2A": "Italiano (Spiniella)",
        "CLASSE 2B": "Italiano (Brazzarola)",
        "CLASSE 2C": "Sc. Motorie (Bortolazzi)",
        "CLASSE 3A": "Matematica (Saccomani, Gaiga) - Compresenza (Altobelli)",
        "CLASSE 3B": "Italiano (Pasqua) - Recupero (Boccardi)",
        "CLASSE 3C": "Matematica (Saccomani, Gaiga) - Compresenza (Altobelli)",
        "CLASSE 3D": "Italiano (Mella)"
    },
    {
        "GIORNO": "GIOVEDÍ",
        "ORE": "IV",
        "CLASSE 1A": "Storia (Filippozzi)",
        "CLASSE 1B": "Info (Ferrari V.)",
        "CLASSE 1C": "Inglese pot (Marchetto)",
        "CLASSE 1D": "Matematica (Salomoni)",
        "CLASSE 2A": "Italiano (Spiniella)",
        "CLASSE 2B": "Italiano (Brazzarola)",
        "CLASSE 2C": "Sc. Motorie (Bortolazzi)",
        "CLASSE 3A": "Matematica (Saccomani, Gaiga) - Compresenza (Altobelli)",
        "CLASSE 3B": "Italiano (Pasqua)",
        "CLASSE 3C": "Matematica (Saccomani,Gaiga) - Compresenza (Altobelli)",
        "CLASSE 3D": "Italiano (Mella) - Compresenza (Boccardi)"
    },
    {
        "GIORNO": "GIOVEDÍ",
        "ORE": "V",
        "CLASSE 1A": "Inglese pot (Marchetto) - Spagnolo (Rapetta) - Tedesco (Ferrari C.)",
        "CLASSE 1B": "Sc. Motorie (Bortolazzi)",
        "CLASSE 1C": "Italiano (Mella)",
        "CLASSE 1D": "Inglese pot (Marchetto) - Spagnolo (Rapetta) -  Tedesco (Ferrari C.)",
        "CLASSE 2A": "Geografia (Boccardi)",
        "CLASSE 2B": "Tecno (Ferrari V.)",
        "CLASSE 2C": "Geografia (Pasqua)",
        "CLASSE 3A": "Italiano (Spiniella)",
        "CLASSE 3B": "Matematica (Gaiga, Saccomani) - Compresenza (Salomoni)",
        "CLASSE 3C": "Geografia (Brazzarola)",
        "CLASSE 3D": "Matematica (Gaiga, Saccomani) - Compresenza (Salomoni)"
    },
    {
        "GIORNO": "GIOVEDÍ",
        "ORE": "VI",
        "CLASSE 1A": "Inglese pot (Marchetto) - Spagnolo (Rapetta) - Tedesco (Ferrari C.)",
        "CLASSE 1B": "Sc. Motorie (Bortolazzi)",
        "CLASSE 1C": "Italiano (Mella)",
        "CLASSE 1D": "Inglese pot (Marchetto) - Spagnolo (Rapetta) - Tedesco (Ferrari C.)",
        "CLASSE 2A": "Storia (Boccardi)",
        "CLASSE 2B": "Tecno (Ferrari V.)",
        "CLASSE 2C": "Storia (Brazzarola)",
        "CLASSE 3A": "Italiano (Spiniella)",
        "CLASSE 3B": "Matematica (Gaiga, Saccomani) - Compresenza (Salomoni)",
        "CLASSE 3C": "Inglese pot (Rapetta)",
        "CLASSE 3D": "Matematica (Gaiga, Saccomani) - Compresenza (Salomoni)"
    },
    {
        "GIORNO": "VENERDÍ",
        "ORE": "I",
        "CLASSE 1A": "Storia (Filippozzi)",
        "CLASSE 1B": "Geografia (Pasqua)",
        "CLASSE 1C": "Matematica (Salomoni)",
        "CLASSE 1D": "Arte (Forte)",
        "CLASSE 2A": "Sc. Motorie (Bortolazzi)",
        "CLASSE 2B": "Italiano (Brazzarola) - Recupero (Spiniella)",
        "CLASSE 2C": "Italiano (Boccardi)",
        "CLASSE 3A": "Musica (Ferronato)",
        "CLASSE 3B": "Info (Ferrari V.)",
        "CLASSE 3C": "Inglese pot (Rapetta)",
        "CLASSE 3D": "Italiano (Mella)"
    },
    {
        "GIORNO": "VENERDÍ",
        "ORE": "II",
        "CLASSE 1A": "Italiano (Spiniella)",
        "CLASSE 1B": "Scienze (Gaiga)",
        "CLASSE 1C": "Matematica (Salomoni)",
        "CLASSE 1D": "Arte (Forte)",
        "CLASSE 2A": "Sc. Motorie (Bortolazzi)",
        "CLASSE 2B": "Geografia (Brazzarola)",
        "CLASSE 2C": "Italiano (Boccardi)",
        "CLASSE 3A": "Musica (Ferronato)",
        "CLASSE 3B": "Italiano (Pasqua)",
        "CLASSE 3C": "Inglese pot (Rapetta)",
        "CLASSE 3D": "Italiano (Mella)"
    },
    {
        "GIORNO": "VENERDÍ",
        "ORE": "III",
        "CLASSE 1A": "Matematica (Saccomani)",
        "CLASSE 1B": "Musica (Ferronato)",
        "CLASSE 1C": "Italiano (Mella)",
        "CLASSE 1D": "Scienze (Salomoni)",
        "CLASSE 2A": "Tecno (Ferrari V.)",
        "CLASSE 2B": "Inglese pot (Inverardi) - Spagnolo (Rapetta)",
        "CLASSE 2C": "Inglese pot (Marchetto) - Spagnolo (Rapetta)",
        "CLASSE 3A": "Arte (Forte)",
        "CLASSE 3B": "Italiano (Pasqua)",
        "CLASSE 3C": "Italiano (Boccardi)",
        "CLASSE 3D": "Scienze (Gaiga)"
    },
    {
        "GIORNO": "VENERDÍ",
        "ORE": "IV",
        "CLASSE 1A": "Matematica (Saccomani)",
        "CLASSE 1B": "Musica (Ferronato)",
        "CLASSE 1C": "Religione (Brazzarola)",
        "CLASSE 1D": "Geografia (Filippozzi)",
        "CLASSE 2A": "Tecno (Ferrari V.)",
        "CLASSE 2B": "Inglese pot (Inverardi) - Spagnolo (Rapetta)",
        "CLASSE 2C": "Inglese pot (Marchetto) - Spagnolo (Rapetta)",
        "CLASSE 3A": "Arte (Forte)",
        "CLASSE 3B": "Scienze (Gaiga)",
        "CLASSE 3C": "Italiano (Boccardi)",
        "CLASSE 3D": "Storia (Mella)"
    },
    {
        "GIORNO": "VENERDÍ",
        "ORE": "V",
        "CLASSE 1A": "Tecno (Ferrari V.)",
        "CLASSE 1B": "Arte (Forte)",
        "CLASSE 1C": "Inglese pot (Marchetto)",
        "CLASSE 1D": "Italiano (Filippozzi)",
        "CLASSE 2A": "Italiano (Spiniella)",
        "CLASSE 2B": "Matematica (Gaiga) - Recupero (Saccomani)",
        "CLASSE 2C": "Matematica (Salomoni) - Recupero (Saccomani)",
        "CLASSE 3A": "Storia (Boccardi)",
        "CLASSE 3B": "Inglese pot (Inverardi) - Inglese ord (Rapetta)",
        "CLASSE 3C": "Musica (Ferronato)",
        "CLASSE 3D": "Inglese pot (Inverardi) - Inglese ord (Rapetta)"
    },
    {
        "GIORNO": "VENERDÍ",
        "ORE": "VI",
        "CLASSE 1A": "Tecno (Ferrari V.)",
        "CLASSE 1B": "Arte (Forte)",
        "CLASSE 1C": "Inglese pot (Marchetto)",
        "CLASSE 1D": "Italiano (Filippozzi)",
        "CLASSE 2A": "Geografia (Boccardi)",
        "CLASSE 2B": "Matematica (Gaiga) - Recupero (Saccomani)",
        "CLASSE 2C": "Matematica (Salomoni) - Recupero (Saccomani)",
        "CLASSE 3A": "Geografia (Mella)",
        "CLASSE 3B": "Inglese pot (Inverardi) - Inglese ord (Rapetta)",
        "CLASSE 3C": "Musica (Ferronato)",
        "CLASSE 3D": "Inglese pot (Inverardi) - Inglese ord (Rapetta)"
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