import React, {useState} from 'react';
import * as yup from "yup";
import {ErrorMessage} from '@hookform/error-message';
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import api from "../api";
import "../styles/form.scss";


const Form = () => {

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        date: "",
    })

    const validationSchema = yup.object().shape({
        firstName: yup.string()
            .required("this field is required"),
        lastName: yup.string()
            .required("this field is required"),
        email: yup.string()
            .required("this field is required")
            .email("email address is not valid"),
        date: yup.string()
            .required("this field is required"),
    });

    const {handleSubmit, register, formState: {errors}, reset} = useForm({
        mode: "onBlur",
        resolver: yupResolver(validationSchema)
    });

    const eventCreateHandler = async () => {
        const currentData = data;
        await api.insertEvent(currentData).then(res => {
            window.alert('Event created succesfully!');
        }).catch(error => {
            window.alert(error + " - try again later");
        })
        reset();
    }

    const onChangeHandler = (e) => {
        setData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    return (
        <>
            <h1 className="page-title">Create-event.app</h1>
            <div className="page-container">
                <form onSubmit={handleSubmit(eventCreateHandler)}>
                    <div className="firstname-wrapper">
                        <label htmlFor="firstName">first name</label>
                        <input type="text"
                               autoComplete="nope"
                               className={!errors?.firstName ? "correct-input" : "error-input"}
                               id="firstName"
                               placeholder="John"
                               {...register("firstName")}
                               onChange={onChangeHandler}
                        />
                        <div className="error-msg-wrapper">
                            <ErrorMessage as={<div className={"error-message"}/>} errors={errors} name={"firstName"}/>
                        </div>
                    </div>
                    <div className="lastname-wrapper">
                        <label htmlFor="lastName">last name</label>
                        <input type="text"
                               autoComplete="nope"
                               className={!errors?.lastName ? "correct-input" : "error-input"}
                               id="lastName"
                               placeholder="Doe"
                               {...register("lastName")}
                               onChange={onChangeHandler}
                        />
                        <div className="error-msg-wrapper">
                            <ErrorMessage as={<div className={"error-message"}/>} errors={errors} name={"lastName"}/>
                        </div>
                    </div>
                    <div className="email-wrapper">
                        <label htmlFor="email">email</label>
                        <input type="email"
                               autoComplete="nope"
                               className={!errors?.email ? "correct-input" : "error-input"}
                               id="email"
                               placeholder="john.doe@mail.com"
                               {...register("email")}
                               onChange={onChangeHandler}
                        />
                        <div className="error-msg-wrapper">
                            <ErrorMessage as={<div className={"error-message"}/>} errors={errors} name={"email"}/>
                        </div>
                    </div>
                    <div className="date-wrapper">
                        <label htmlFor="date">date</label>
                        <input type="date"
                               autoComplete="nope"
                               className={!errors?.date ? "correct-input" : "error-input"}
                               id="date"
                               {...register("date")}
                               onChange={onChangeHandler}
                        />
                        <div className="error-msg-wrapper">
                            <ErrorMessage as={<div className={"error-message"}/>} errors={errors} name={"date"}/>
                        </div>
                    </div>
                    <button type="submit" className="btn">Create event</button>
                </form>
            </div>
        </>
    );
};

export default Form;