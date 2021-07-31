import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Poke from './Pokemon'

function Calc() {
    const [pokemon, setPokemon] = useState('')
    const [desp, setDesp] = useState([''])
    const [keys, setKeys] = useState([''])

    const some = () => {
        axios.get(`http://localhost:2999/${pokemon}`).then((response) => {
            console.log("In Here baby " + response.data)
            setDesp(response.data)
        })
    }

    const descripEmptyOrNot = () => {
        console.log("In Here")
        if (desp == '') {
            console.log("In here now")
            return ''
        } else if(desp == 'helper') {
            return "You've entered an invalid Pokemon"
        } else {
            let finalString = ''
            for(let i = 0; i < desp.length; ++i) {
                finalString += desp[i] + " "
                console.log("In here yolo")
            }
            return finalString
        }
    }

    const pokeEmptyOrNot = () => {
        if (pokemon == '') {
            return ''
        } else {
            return "The Pokemon you entered is: "
        }
    }

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        some()
        sleep(5000)
        setKeys(Object.keys(desp))
        if (desp == '') {
            setDesp(['helper'])
        }
        console.log(desp)
        console.log(keys)
    }

    return (
        <div>
            <h1>Welcome to Hydrapedia</h1>
            <h3>Enter the information about the Pokemon you would like to enter</h3>
            <br />
            <form onSubmit={onSubmit}>
                <label htmlFor='PokeName'>Enter your Pokemon here:  
                    <input type='text' onChange={(e) => {
                        setPokemon(e.target.value)
                        setDesp('')
                    }} />
                </label>
                <input type='submit' value='Enter' />
            </form>
            <p>{pokeEmptyOrNot()} {pokemon}</p>
            <p>{descripEmptyOrNot()}</p>
        </div>
    )
}

export default Calc;