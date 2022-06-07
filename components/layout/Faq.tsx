import React from "react";
import ExternalLink from "../utils/ExternalLink";

const Question =
({
   text,
   children
}: {
  text: string,
  children?: React.ReactNode
}) => {
  return (
    <details className="pb-3">
    <summary className="text-xl text-indigo-100 cursor-pointer">
      {text}
    </summary>
      <div className="ml-5 text-indigo-200">
      {children}
      </div>
    </details>
  );
};

const Modal =
({
   buttonClassName,
   buttonText
}: {
  buttonClassName?: string,
  buttonText: string,
}) => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <button
        className={`text-sm font-light text-gray-300 hover:underline ${buttonClassName}`}
        type="button"
        onClick={() => setShowModal(true)}>
        {buttonText}
      </button>
      {showModal ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 outline-none focus:outline-none text-left"
          onClick={() => setShowModal(false)}
        >
          <div
            className="flex flex-col rounded-lg shadow-lg w-[48rem] h-[70vh] m-6 bg-indigo-900 text-indigo-50"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between p-4 sm:px-6 border-b border-indigo-50">
              <h1 className="text-2xl sm:text-3xl font-semibold">
                FAQ
              </h1>
              <button
                className="text-2xl sm:text-3xl font-semibold"
                type="button"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            <div className="px-4 my-4 sm:px-6 overflow-y-auto overflow-y-overlay scrollbar-gutter-stable scrollbar-thin">
              <Question text="Perché non trovo il mio indirizzo?">
                Probabilmente perché il tuo indirizzo era bianco nelle consultazioni del 2015-17 ed è quindi oggetto di intervento pubblico diretto o a concessione nell&apos;ambito del piano BUL.
                <br />
                Se il tuo comune, la tua via o il tuo civico sono cambiati negli ultimi sei anni, prova a cercare anche con i dati vecchi. Gli indirizzi sono presi direttamente dalle consultazioni, quindi potrebbero non essere aggiornati.
              </Question>
              <Question text="Perché gli indirizzi inclusi nel Piano Aree Bianche sono assenti?">
                Perché non sono riuscito a trovare i risultati per civico per quegli indirizzi, fatta eccezione per i civici bianchi di Calabria, Puglia e Sardegna.
              </Question>
              <Question text="Perché alcuni civici sono duplicati?">
                Perché nei dati pubblicati da Infratel sono presenti con la stessa denominazione, ma con identificativo diverso.
                In caso di civici duplicati l&apos;esponente è utilizzato per numerarli.
              </Question>
              <Question text="Cos&apos;è il Piano Italia 1 Giga?">
                Il Piano Italia 1 Giga, precedentemente noto come piano aree grigie, è un piano per portare una connessione VHCN, tramite finanziamento misto pubblico-privato, ai civici che nel 2026 non ne avranno una (da operatori privati) e che non sono stati oggetto di interventi diretti o a concessione nell&apos;ambito del piano BUL.
              </Question>
              <Question text="Cosa significa che un indirizzo è incluso nel Piano Italia 1 Giga?">
                Che quell&apos;indirizzo verrà presumbilmente coperto (dal vincitore del bando) entro il 2026 con una connessione (cablata o wireless) in grado di fornire, in tipiche condizioni di picco di traffico, almeno 1 Gbps in download e almeno 200 Mbps in upload al primo peering point.
                <br />Se non sei incluso nel Piano Italia 1 Giga controlla i risultati della consultazione 2021, probabilmente avrai copertura FTTH da un privato.
                <br />I civici oggetto di intervento pubblico diretto o a concessione nell&apos;ambito del piano BUL non possono essere inclusi nel Piano Italia 1 Giga.
              </Question>
              <Question text="Cosa significa vincitore non ancora noto?">
                Che il corrispondente lotto del Piano Italia 1 Giga non è stato ancora assegnato o non ne si conosce il vincitore.
              </Question>
              <Question text="La mia città è inclusa nel piano di coinvestimento Fibercop, ma il vincitore del Piano Italia 1 Giga è OpenFiber, c&apos;è qualche problema?">
                Non c&apos;è nessun problema, fortunatamente in Italia c&apos;è ancora un minimo di concorrenza e di conseguenza i lotti non sono stati assegnati ad un&apos;unica azienda.
                <br />Inoltre Fibercop non aveva espresso l&apos;intenzione di coprirti con una rete VHCN, quindi non c&apos;è nulla di sbagliato se lo stato incarica qualcun altro.
              </Question>
              <Question text="I risultati di questo sito sono affidabili?">
                Non sono più affidabili dei dati su cui si basa.
                <br />Considerando che le consultazioni sono soggette ad errori di vario genere io le interpreterei come delle promesse che ahimè possono essere disattese. Discorso analogo per il Piano Italia 1 Giga, entro certi limiti e a determinate condizioni possono essere aggiunti o rimossi indirizzi dal piano.
              </Question>
              <Question text="Perché il sito bandaultralarga da risultati diversi?">
                Il sito bandaultralarga ha a disposizione tutti gli indirizzi italiani aggiornati, ha a disposizione i risultati anno per anno di ciascuna consultazione e fa riferimento esclusivamente alle consultazioni, ignorando i civici effettivamente messi a bando per il Piano Italia 1 Giga.
                <br />Queste sono le principali differenze rispetto a questo sito che invece si basa esclusivamente su ciò che è stato reso pubblico da infratel stessa.
              </Question>
              <Question text="Sono coperto da FTTH ma secondo questo sito non lo sono, perché?">
                Le consultazioni sono soggette ad errori di vario genere, la responsabilità è comunque dell&apos;operatore dichiarante, cioè io o Infratel non ci possiamo fare nulla. Probabilmente i progetti saranno stati modificati dopo le consultazioni o l&apos;indirizzo era censito male nei sistemi di quell&apos;operatore.
              </Question>
              <Question text="Cosa significa non censito?">
                Che quell&apos;indirizzo non era presente nei risultati per civico di quella consultazione.
                <br />Gli indirizzi di Calabria, Puglia e Sardegna che risultano solo nella consultazione 2017, sono molto probabilmente indirizzi dichiarati bianchi nel 2015-17 ed oggetto di intervento pubblico diretto o a concessione nell&apos;ambito del piano BUL.
              </Question>
              <Question text="Cosa rappresenta il colore del civico?">
                Il colore del civico è un modo per indicare quanto è redditizio per gli operatori privati quel civico.
                Nello specifico un civico è <b>nero</b> se è coperto da più reti NGA indipendenti, <b>grigio</b> se è coperto da una sola rete NGA, <b>bianco</b> se non è coperto da alcuna rete NGA.
                <br />La definizione di reti indipendenti è cambiata negli anni, nelle consultazioni più recenti reti NGA dello stesso operatore e reti di operatori diversi che condividono l&apos;ultimo miglio (es. FTTC SLU) non sono considerate indipendenti.
              </Question>
              <Question text="Cosa significa NGA?">
                Una rete si definisce NGA se è in grado di fornire almeno 30 Mbps in download e almeno 15 Mbps in upload ad un singolo utente. Da questa definizione vengono tipicamente escluse le FWA su frequenze non licenziate.
              </Question>
              <Question text="Cosa significa VHCN?">
                Per rete VHCH si intende, genericamente, una rete che è o sarà in grado di fornire 1 Gbps in download ad un singolo utente in tipiche condizioni di picco di traffico. La definizione precisa applicata nelle consultazioni è però cambiata nel tempo.
                <br />Nella consultazione 2019 una rete era definita VHCN se era una rete FTTH o FTTB in grado di fornire almeno 100 Mbps in download e almeno 50 Mbps in upload ad un singolo utente.
                <br />Dalla consultazione 2020 in poi alla definizione precedente è stata aggiunta una specifica per le reti FWA, sono considerate VHCN le reti FWA che sono in grado di fornire, ad un singolo utente in tipiche condizioni di picco di traffico, almeno 1 Gbps in download, almeno 200 Mbps in upload e latenza inferiore o uguale a 10 millisecondi al primo peering point.
              </Question>
              <Question text="Perché nella consultazione 2021 non è indicato il colore del mio civico?">
                La consultazione 2021 è divisa in due parti, una per gli indirizzi che nelle consultazioni del 2015-17 erano risultati grigi o neri, un&apos;altra per quelli che erano risultati bianchi ma esclusi dal Piano Aree Bianche. Nei risultati di quest&apos;ultima non è indicato il colore del civico.
              </Question>
              <Question text="Cos&apos;è la velocità massima?">
                La velocità massima è la velocità massima raggiungibile da un singolo utente su quella rete, nelle migliori condizioni possibili.
                <br />Per le consultazioni 2021 velocità massima ≥ 300Mbps equivale a copertura FTTH o FTTB, per le consultazioni 2017 e 2019 velocità massima ≥ 100Mbps equivale a copertura FTTH o FTTB.
              </Question>
              <Question text="Cos&apos;è la velocità nelle ore di punta?">
                La velocità nelle ore di punta (<i>velocità di picco</i> nei documenti Infratel) è una stima della banda disponibile per un singolo utente quando gli altri (con cui condivide l&apos;infrastruttura) stanno utilizzando attivamente la loro connessione, ad esempio per guardare una partita di calcio in streaming.
                <br />Nei documenti Infratel c&apos;è una formula di riferimento per calcolare tale valore.
              </Question>
              <Question text="Perché la velocità nelle ore di punta è più alta di quella massima?">
                Innanzitutto, nei risultati della consultazione 2021 aree grigie e nere la velocità nelle ore di punta aveva più intervalli di quella massima, quindi non è anomalo avere velocità massima maggiore o uguale a 300 Mbps e velocità nelle ore di punta maggiore o uguale a 1000 Mbps.
                <br />Per gli altri casi è possibile che l&apos;operatore dichiarante abbia tenuto conto dell&apos;offerta commerciale. Ad esempio considerando un albero GPON 1:64 con taglio massimo commerciale di 100 Mbps in download e 20 Mbps in upload, 100 Mbps potrebbe essere la velocità massima e 1900 Mbps quella nelle ore di punta.
              </Question>
              <Question text="Perché nella consultazione 2020 il colore del mio indirizzo è nero e in quella 2021 è grigio?">
                Probabilmente perché i risultati per civico della consultazione 2021 includono solo la copertura cablata, cioè sono state escluse da quei risultati le FWA.
              </Question>
              <Question text="Come si interpretano i risultati della consultazione 2020?">
                I risultati della consultazione 2020 possono assumere questi valori: <i>bianco</i>, <i>non coperti</i>, <i>grigio novhcn fwa</i>, <i>grigio novhcn rame</i>, <i>grigio vhcn fwa</i>, <i>grigio vhcn fo</i>, <i>grigio vhcn fo</i>, <i>nero novhcn</i>, <i>nero vhcn fwa</i>, <i>nero vhcn fo</i>.
                <br />Nei risultati di questo sito <i>non coperti</i> è stato accorpato a <i>bianco</i>, <i>novhcn</i> sostituito con NGA e <i>fo</i> con FTTH.
                <br />La prima parte del risultato indica il colore del civico, la seconda parte indica se la rete NGA di categoria massima è VHCN o meno, la terza parte indica l&apos;architettura della rete di categoria massima (in caso di ex aequo FTTH ha priorità su FWA).
              </Question>
              <Question text="Perché i risultati della consultazione 2020 per la provincia di Rimini sono incompleti?">
                Perché gli identificativi di quei indirizzi avevano al più 4 cifre significative su 15 (sono in notazione esponenziale)
              </Question>
              <Question text="Perché i risultati della consultazione 2019 dicono NGA-VHCN e questo sito ≥ 100Mbps?">
                Ho deciso di applicare una semplificazione per rendere i risultati della consultazione 2019 più simili a quelli delle altre consultazioni. La copertura NGA è diventata velocità maggiore o uguale a 30 Mbps, copertura NGA-VHCN è diventata velocità maggiore o uguale a 100 Mbps.
              </Question>
              <Question text="Perché mancano i risultati della consultazione 201x?">
                Perché non sono riuscito a trovare i risultati per civico di quella consultazione.
              </Question>
              <Question text="Perché gli intervalli di velocità differiscono da quelli Infratel?">
                Gli intervalli di velocità di Infratel possono essere ambigui, in alcuni casi hanno interpretazioni diverse nello stesso documento. Su questo sito ho usato l&apos;interpretazione che mi è parsa più logica.
              </Question>
              <Question text="Le velocità si riferiscono al download, all&apos;upload o entrambi?">
                Le velocità riportate nei risultati di questo sito si riferiscono esclusivamente al download.
              </Question>
              <Question text="Penso di aver trovato un errore, come faccio a segnalarlo?">
                Puoi scrivermi su <ExternalLink className="text-base" href="https://t.me/andreamen97">Telegram</ExternalLink>, ma per favore assicurati che l&apos;errore che vuoi segnalare non sia presente nei dati su cui questo sito si basa.
              </Question>
              <Question text="Dove trovo i dati su cui si basa questo sito?">
                In questa repo su GitHub: <ExternalLink className="text-base" href="https://github.com/HandyMenny/database-Infratel">Database Infratel</ExternalLink>.
              </Question>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Modal;