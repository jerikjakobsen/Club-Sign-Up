import React, { useState, useEffect} from 'react'
import "./styles/homeStyles.css"
import TextField from '@material-ui/core/TextField'
import {addLink, deleteAttendants, syncLocalStorage, addClubName} from '../Actions/actions'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory, Link} from 'react-router-dom'

function Home() {
    const [link, setLink] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()
    const storeLink = useSelector(state => state.list)
    const localStorageState = JSON.parse(localStorage.getItem('state')) === null ? {link: "", attendants: ""} : JSON.parse(localStorage.getItem('state'))
    const [error, setError] = useState('')
    const [clubName, setClubName] = useState('')

    useEffect(()=> {
        if (localStorageState !== null) {
        dispatch(syncLocalStorage(localStorageState))
        }
    })

    function openForms() {
        if (link==='') {
            setError('Must not be empty')
        } else {
        if (link !== storeLink && link !== localStorageState.link) {
            dispatch(deleteAttendants())
            localStorageState.link = link
            localStorageState.attendants = []
            localStorageState.clubName = clubName
            localStorage.setItem('state', JSON.stringify(localStorageState))
            dispatch(addLink(link))
            dispatch(addClubName(clubName))
            history.push('/signup')
            /*
                Check if the bot was added
                    i.e. Send Api request to /sheets
                        If (message =="success")   -> let them go to sign up
                        else if (error code = 403) ->  Bot does not have permission to edit,
                                                        please make sure you shared the sheets
                                                        with the email above and you put the
                                                        correct link in!
            */
            } else {
                if (localStorageState.link===link) {
                    dispatch(addClubName(clubName))
                    history.push('/signup')
                }
            }
        }
    }
    
        return (
                <div>
                    {useSelector(state => state.link) === "" ? 
                        null
                        :
                        <Link style={{fontSize: "90%", float: "right", color: "rgb(50,50,100)", paddingRight: "15px", marginBottom: "-15px", paddingTop: "15px"}} to='/signup'>Back to your Form</Link>
                        }
                    <div className="body">
                        <h1>Welcome to Club Event Forms</h1>
                        <hr style={{width: '70%'}}/>
                        <p style={{textAlign: 'left'}}>To set up your Form you need to do two simple steps<br/>
                            1. Share your Google sheets with <span style={{color: 'rgb(0,0,230)'}}>club-sign-up@appspot.gserviceaccount.com</span><br/>
                            2. Copy and paste the Link to your Google Sheets below
                        </p>
                        <TextField error={!(error === "")} helperText={error} className="sheetsLink" onChange={(e)=> setLink(e.target.value)} value={link} label="Your Google Sheets Link"/>
                        <TextField className="sheetsLink" onChange={(e) => {setClubName(e.target.value)}} value={clubName} label ="Club Name"/>
                        <button onClick={openForms}>Open your Form!</button>
                    </div>

                </div>
        )
    }

export default Home
