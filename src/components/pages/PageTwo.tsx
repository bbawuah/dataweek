import React, { useEffect, useState } from 'react';
import { D3Map } from "../../d3/Map";
import Layout from '../layout/Layout';
import politieData from '../../politiedata.json'
import { buurten } from '../../format/buurten';
import { BarChart } from '../../d3/BarChart';
import { StaticBarChart } from '../../d3/StaticBarChart';
import { List } from '../layout/List';
import { Highlight } from '../layout/Highlights';

const centrum = Object.values(buurten.centrum)
const oost = Object.values(buurten.oost)
const holendrecht = Object.values(buurten.holendrecht)
const gein = Object.values(buurten.gein)
const nellestein = Object.values(buurten.nellestein)

const PageTwo = () => {
    const [politieCijfers, setPolitieCijfers] = useState()
    const [barChartData, setBarChartData] = useState<any[]>()

    useEffect(() => {
        const data: any = politieData

        
        const centrumArray = centrum.map((gebied: any) => {
            const filter = data.data.filter((item: any) => item["Wijken en buurten"] === gebied)
            return filter.filter((d: any) => d["Geregistreerde misdrijven (aantal)"] !== '.')
        })

        const oostArray = oost.map((gebied: any) => {
            const filter = data.data.filter((item: any) => item["Wijken en buurten"] === gebied)
            return filter.filter((d: any) => d["Geregistreerde misdrijven (aantal)"] !== '.')
        })

       
        const holendrechtArray = holendrecht.map((gebied: any) => {
            const filter = data.data.filter((item: any) => item["Wijken en buurten"] === gebied)
            return filter.filter((d: any) => d["Geregistreerde misdrijven (aantal)"] !== '.')
        })

        const geinArray = gein.map((gebied: any) => {
            const filter = data.data.filter((item: any) => item["Wijken en buurten"] === gebied)
            return filter.filter((d: any) => d["Geregistreerde misdrijven (aantal)"] !== '.')
        })

        const nellesteinArray = nellestein.map((gebied: any) => {
            const filter = data.data.filter((item: any) => item["Wijken en buurten"] === gebied)
            return filter.filter((d: any) => d["Geregistreerde misdrijven (aantal)"] !== '.')
        })


        const formattedData: any = {
            centrum: centrumArray,
            oost: oostArray,
            holendrecht: holendrechtArray,
            gein: geinArray,
            nellestein: nellesteinArray
        }
        

        setPolitieCijfers(formattedData)
        setBarChartData([...centrumArray, ...oostArray, ...holendrechtArray, ...geinArray, ...nellesteinArray])

    }, [])

    return (
    <div className="map-background">
        <Layout>
         <div className="page-two-container">
            <h2>Gevoel vs realiteit van Amsterdam Zuidoost</h2>
            <p>
                We hebben een survey rond laten gaan waarin we mensen de mogelijk hebben gegeven om aan te geven welk soort criminaliteit het meeste voorkomt.
                Van deze data en de data van <a href="https://data.politie.nl/#/Politie/nl/dataset/47022NED/table?ts=1607083280811">de politie </a> 
                hebben we een visualisatie gemaakt en deze met elkaar vergeleken.
            </p>
            <div className="barchart-container">
                <div className="barchart">
                    <h3>Gevoel in zuidoost</h3>
                    <p>Een overzicht van de aantallen per soort misdrijf</p>
                <StaticBarChart />
                </div>
                <div className="barchart">
                    <h3>Politie cijfers van zuidoost</h3>
                    <p>Een overzicht van de aantallen per soort misdrijf</p>
                <BarChart cijfers={barChartData}/>
                </div>
            </div>
            </div>
            <div className="page-two-container">
            <div className="uitleg">
                <h2>Bevindingen</h2>
                <div className="highlight-container">
                    <Highlight 
                    text="Kinderporno is veel in het nieuws, maar kwam in Amsterdam-Zuidoost in het afgelopen jaar niet voor. Er zijn 0 gevallen van kinderporno geregistreerd in die maanden. Veel bewoners hebben het gevoel dat het wel veel voorkomt, bijna net zoveel als alle andere vormen van criminaliteit."
                    >
                        <h2>Kinderporno</h2>
                    </Highlight>

                    <Highlight 
                    text="Moord en doodslag vind in de beleving van de bewoners veel plaats. In de realiteit vind het enkele keren per maand plaats in Amsterdam-Zuidoost. Moord is de uiting van veel onderliggend geweld. Hier is in een bepaalde mate een voedingsbodem voor in Amsterdam-Zuidoost omdat mishandeling elke maand tientallen keren voorkomt."
                    >
                        <h2>Moord en doodslag</h2>
                    </Highlight>
                </div>
                <div className="highlight-container">
                    <Highlight 
                    text="Winkeldiefstal is een categorie van misdaad waarvan de verwachting klopt met de realiteit. Het komt vrij veel voor in Amsterdam Zuidoost. Aan de ene kant zou het aantal gevallen van winkeldiefstal nog veel hoger kunnen zijn omdat het een relatief eenvoudige misdaad is. Aan de andere kant zou het kunnen dat winkeldiefstal accuraat wordt geregistreerd omdat veel winkels beveiliging hebben geïnstalleerd."
                    >
                        <h2>Winkeldiefstal</h2>
                    </Highlight>

                    <Highlight 
                    text="Bij Cybercrime is het zo dat het in bepaalde maanden wel voorkomt en in andere maanden niet. Het besef over de wisseling van de frequentie is er waarschijnlijk niet echt bij de bewoners. Wat zorgt ervoor dat een maand meer cybercrime criminaliteit heeft of juist minder?"
                    >
                        <h2>Cybercrime</h2>
                    </Highlight>
                </div>
              <h2>De buurten</h2>
              <p>Deze buurten hebben we meegenomen in onze visualisatie.</p>
                </div>

            <div className="buurten">
                <div className="buurt">
                    <strong><p>De buurt Centrum bestaat uit:</p></strong>
                    <List buurten={centrum}/>
                </div>

                <div className="buurt">
                <strong><p>De buurt Oost bestaat uit:</p></strong>
                    <List buurten={oost}/>
                </div>
              </div>
               
               <div className="buurten">
            
                <div className="buurt">
                <strong><p>De buurt Holendrecht bestaat uit:</p></strong>
                    <List buurten={holendrecht}/>
                </div>

                <div className="buurt">
                <strong><p>De buurt Gein bestaat uit:</p></strong>
                <List buurten={gein}/>
                </div>
                    <div className="buurt">
                    <strong><p>De buurt Nellestein bestaat uit:</p></strong>
                                <List buurten={nellestein}/>
                    </div>
                
              
               </div>
             </div>
            <div className="page-two-container">      
                    <h2>Een kaart van Amsterdam Zuidoost</h2>
                    <p>Per gebied, kunt u een overzicht van de aantallen per soort misdrijf bekijken</p>
                    <D3Map cijfers={politieCijfers}/>
             </div>
         </Layout>
    </div>
        )
}

export default PageTwo;