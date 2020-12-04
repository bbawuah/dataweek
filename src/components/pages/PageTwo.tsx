import React, { useEffect, useState } from 'react';
import { D3Map } from "../../d3/Map";
import Layout from '../layout/Layout';
import politieData from '../../politiedata.json'
import { buurten } from '../../format/buurten';
import { BarChart } from '../../d3/BarChart';
import { StaticBarChart } from '../../d3/StaticBarChart';
import { List } from '../layout/List';

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
            <h2>Een kaart van Amsterdam Zuidoost</h2>
            <div className="barchart-container">
                <div className="barchart">
                    <h3>Gevoel in zuidoost</h3>
                <StaticBarChart />
                </div>
                <div className="barchart">
                    <h3>Politie cijfers van zuidoost</h3>
                <BarChart cijfers={barChartData}/>
                </div>
            </div>
            </div>
            <div className="page-two-container">
            <div className="uitleg">

              <h2>De buurten</h2>
              <p>Hier komt wat tekst</p>
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
                    <D3Map cijfers={politieCijfers}/>
             </div>
         </Layout>
    </div>
        )
}

export default PageTwo;