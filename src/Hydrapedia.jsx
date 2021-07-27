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

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        some()
        sleep(5000)
        setKeys(Object.keys(desp))
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
                    }} />
                </label>
                <input type='submit' value='Enter' />
            </form>
            <p>{pokemon}</p>
            <p>{desp['0'] + " wut " + desp['1'] + "Hello"}</p>
            <table>
                {keys.map((pokemonN) => {
                    <Poke
                    pokemonName={pokemonN} />
                    console.log("Out HeRe?" + pokemon + desp + pokemonN)
                })}
            </table>
        </div>
    )
}

export default Calc;