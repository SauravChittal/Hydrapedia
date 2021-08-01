import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Hydrapedia.css'

/**
 * Function which does most of the work of retriving data from API and printing it
 * @returns Different state of page depending on whether information has been entered or not
 */
function Calc() {
    // Stores the information about the Pokemon you're entering
    const [pokemon, setPokemon] = useState('')
    // Stores the description of the Pokemon returned from the API
    const [desp, setDesp] = useState([''])

    // Just sets the document title to be the pokemon that is being entered
    useEffect(() => document.title = pokemon, [pokemon])

    /**
     * This function gets information from the API and updates the description with information received
     */
    const getData = () => {
        axios.get(`http://localhost:2999/${pokemon}`).then((response) => {
            setDesp(response.data)
        })
    }

    /**
     * One portion of the page which requests information about pokemon required. 
     * This is what is shown first when the site is launched.
     * @returns Nothing if page is not supposed to be loaded. The information about page when the desp is empty,
     *          or no Pokemon has been entered.
     */
    const showLabels = () => {
        if (desp == '') {
            return (<div>
                <h1 id='Check'>Welcome to Hydrapedia</h1>
                <h3 className='PlaceHolder'>Enter the information about the Pokemon you would like to enter</h3>
                <br />
                <form onSubmit={onSubmit}>
                    <label htmlFor='PokeName'>Enter your Pokemon here:  
                        <input type='text' onChange={(e) => {
                            setPokemon(e.target.value)
                            setDesp('')
                        }} />
                    </label>
                    <input type='submit' value='Enter' id='PokemonEnter'/>
                </form>
                </div>)
        } else {
            return ''
        }
    }

    /**
     * The button which allows you to go back the original page
     * @returns Nothing if on the original page itself. Form with input type as submit when you're not on the original page
     */
    const goBackToPrev = () => {
        if (desp != '') {
            return (
                <div>
                    <form onSubmit={() => {
                        setDesp('')
                        setPokemon('')
                    }}>
                        <input id='PokemonEnter' type='submit' value='Go Back to the previous page' />
                    </form>
                </div>
            )
        } else {
            return ''
        }
    }

    /**
     * Takes the desp variable and turns in into readable text since desp is an array.
     * The term helper has been used as placeholder when the Pokemon entered is invalid since the desp can never be just 'helper'.
     * Similarly, == is used instead of === since I want the functionality of == converting array into comparable format.
     * Finally, I do plan on using a forEach over for loop later, if and when I update this. Mainly haven't figured it out how to do fully.
     * @returns Nothing is nothing entered. Error message if Pokemon entered is incorrect. The manipulated string if the Pokemon is correct.
     */
    const descripEmptyOrNot = () => {
        if (desp == '') {
            return ''
        } else if(desp == 'helper') {
            return "You've entered an invalid Pokemon"
        } else {
            let finalString = ''
            for(let i = 0; i < desp.length; ++i) {
                if (i == 1) {
                    let capitalLetters = desp[i].match(/\p{Lu}/gu)
                    console.log(desp[1])
                    if (capitalLetters.length > 1) {
                        let typo = desp[i].split(capitalLetters[1])
                        let types = typo.filter(item => item !== '')
                        if (JSON.stringify(typo) === JSON.stringify(types)) {
                            finalString += "\nType: " + types[0] + " and " + capitalLetters[1] + types[1]
                        } else {
                            finalString += "\nType: " + capitalLetters[0] + types[0] + " and " + capitalLetters[1] + types[1]
                        }
                        continue
                    } else {
                        finalString += "\nType: " + desp[1]
                        continue
                    }
                }
                finalString += desp[i] + " "
                console.log("In here yolo")
            }
            return finalString
        }
    }

    /**
     * This is just meant to be an if statement function, since you can't use them alongside HTML since they require expressions only.
     * @returns generic statement or nothing depending on whether soething is entered or not
     */
    const pokeEmptyOrNot = () => {
        if (pokemon == '') {
            return ''
        } else {
            return "The Pokemon you entered is: "
        }
    }

    // Generic sleep function
    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        getData()
        sleep(5000)
        if (desp == '') {
            setDesp(['helper'])
        }
    }

    return (
        <div>
            {showLabels()}
            <p>{pokeEmptyOrNot()} {pokemon}</p>
            <h2>{descripEmptyOrNot()}</h2>
            {goBackToPrev()}
        </div>
    )
}

export default Calc;