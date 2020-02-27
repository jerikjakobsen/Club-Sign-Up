import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import './styles/signupStyles.css'
import {connect} from 'react-redux'
import axios from 'axios'
import {addAttendant, syncLocalStorage, deleteAttendants} from '../Actions/actions'
import {Link} from 'react-router-dom'

axios.defaults.baseURL="https://us-central1-clubsignup-73ce8.cloudfunctions.net/api"

class signupPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            major: '',
            year: '',
            email: '',
            emailEnding: '',
            windowSize: Math.round(window.innerHeight *.3),
            errors: {
                firstName: '',
                lastName: ''
            }
        }
    }


    componentDidMount() {
        try {
            const serializedState = JSON.parse(localStorage.getItem('state'))
            if (serializedState.attendants === "") serializedState.attendants = []
            this.props.syncLocalStorage(serializedState)
        } catch(err) {
            console.log(err)
        }

    }

    componentWillUnmount() {
        try {
            this.submitSheets()
          } catch {
            // ignore write errors  
          }
    }

    submitSheets = () => {
        if (this.props.attendants !== '' && this.props.link !=="") {
        axios.post('/sheets', {
            payload: this.props.attendants,
            spreadsheetId: this.props.link
        })
        .then(res => {
            if (res.status === 200) {
                this.props.deleteAttendants()
                const newlocalStorage = {
                    link: this.props.link,
                    attendants: "",
                    clubName: this.props.clubName
                }
                localStorage.setItem("state", JSON.stringify(newlocalStorage))
                console.log("Deleted local Attendant list.")
            }
        })
        .catch(err => {
            console.log(err)

        })
    }
    }

    onChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }

    onSubmit = (e) => {

        const attendant = [
            this.state.firstName,
            this.state.lastName,
            this.state.major,
            this.state.year,
            this.state.email.concat(this.state.emailEnding)
        ]

        attendant.forEach((field)=> {
            if (field === "") {
                
            }
        })

        this.props.addAttendant(attendant)
        try {
                const serializedState = JSON.stringify({
                    link: this.props.link,
                    attendants: this.props.attendants,
                    clubName: this.props.clubName
                });
                localStorage.setItem('state', serializedState);
            } catch (err) {
                console.log(err)
            }
        this.setState({
            firstName: '',
            lastName: '',
            major: '',
            year: '',
            email: '',
            emailEnding: ''
        })
    }

    render() {
        return (
            <div style={{display: "flex", flexDirection: "column"}}>
                <div className="Image">
                    <img style={{borderRadius: "0px 0px 25px 25px"}}src={`https://picsum.photos/${Math.round(window.innerWidth)}/${(String(this.state.windowSize))}`} alt="randImg" />
                    <button style={{position: "absolute", top: "8px", right: "16px"}} onClick={this.submitSheets}>Send to Google Sheets</button>
                    <h2 style={{margin: 0, fontSize: "56px", position: "absolute", left: "50%", top: "50%", transform:"translate(-50%, -50%)" }}>{this.props.clubName}</h2>
                    <Link style={{fontSize: "20px",paddingLeft:'15px', position: "absolute", top: "8px",left: "16px"}} to='/'><button>Go Back</button></Link>
                </div>
                <div className="body">
                    <div className='form' >
                    <TextField autoFocus={true} margin='normal' className="TextField" onChange={this.onChange} label="First Name" type='text' name='firstName' value={this.state.firstName} />
                    <TextField margin='normal' className="TextField" onChange={this.onChange} label="Last Name" type='text' name='lastName' value={this.state.lastName} />
                    <TextField margin='normal' className="TextField" onChange={this.onChange} label="Major" type='text' name='major' value={this.state.major} />
                    <TextField margin='normal' className="TextField" onChange={this.onChange} label="Graduating Year" type='text' name='year' value={this.state.year} />
                    <div>
                        <TextField margin='normal' className="TextField" onChange={this.onChange} label="Email" type='text' name='email' value={this.state.email} />
                        <div style={{display: 'inline-block', position: 'relative'}}>
                            <div style={{position: 'absolute', top: 0, paddingLeft: '20px'}}>
                            <FormControl style={{width: '150px'}}>
                                <InputLabel id='email-provider'>Email Provider</InputLabel>
                                    <Select labelId="email-provider" name="emailEnding" value={this.state.emailEnding} onChange={this.onChange}>
                                        <MenuItem value='@citymail.cuny.edu'>@citymail.cuny.edu</MenuItem>
                                        <MenuItem value='@gmail.com'>@gmail.com</MenuItem>
                                        <MenuItem value='@yahoo.com'>@yahoo.com</MenuItem>
                                        <MenuItem value='@outlook.com'>@outlook.com</MenuItem>
                                        <MenuItem value='@hotmail.com'>@hotmail.com</MenuItem>
                                        <MenuItem value=''>Enter other Email</MenuItem>
                                    </Select>
                            </FormControl>
                            </div>
                        </div>
                    </div>
                    </div>
                    <button onClick={this.onSubmit}>Submit</button>
                    <label>{this.state.link}</label>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        link: state.link,
        attendants: state.attendants,
        clubName: state.clubName
        }
}

const mapDispatchToProps = dispatch => {
    return {
        addAttendant: (attendant) => dispatch(addAttendant(attendant)),
        syncLocalStorage: (state) => dispatch(syncLocalStorage(state)),
        deleteAttendants: () => dispatch(deleteAttendants())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(signupPage)
