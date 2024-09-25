import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ProgramarEntrevista2 } from './ProgramarEntrevista2'
import Image from 'next/image'

import Degradado from '../public/0145 - 7H1A0377 B.jpg'
import { FormularioCaptacion } from './FormularioCaptacion'
import { Input } from "@/components/ui/input"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Toaster, toast } from 'sonner'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { FileUploader } from 'react-drag-drop-files';
import { HiOutlineXMark } from 'react-icons/hi2';

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};


const fileTypes = ["JPG", "PNG", "PDF"];
const MAX_FILE_SIZE = 10000000000;

// function checkFileType(file) {
//     if (file?.name) {
//         const fileType = file.name.split(".").pop();
//         if (fileType === "docx" || fileType === "pdf") return true;
//     }
//     return false;
// }

const formSchema = z.object({
    username: z.string().min(2, {
        message: "El nombre debe contener al menos 4 letras",
    }),
    email: z
        .string()
        .min(1, { message: "El correo es invalido" })
        .email("Debe completar como ejemplo@ejem.com"),

    oficina: z.string({ required_error: "Es necesario seleccionar una oficina" }),

    telefono: z.string({ required_error: "Es necesario ingresar el telefono" }),

    cv: z
        .any()
        .refine((file) => file?.length !== 0, "File is required")
        .refine((file) => file.size < MAX_FILE_SIZE, "Max size is 5MB.")
    // .refine((file) => checkFileType(file), "Only .pdf, .docx formats are supported.")
})

import { motion } from "framer-motion";
import { guardarFomulario } from "../action"


const fadeInAnimationVariants = {
    initial: (i) => ({
        opacity: 0,
        translateY: -50,
    }),
    animate: (i) => (
        {
            opacity: 1, translateX: 0, translateY: 0,
            transition: {
                duration: 0.8,
                delay: i * 0.4,

            }
        }
    )
}

export const EntrevistaPage = () => {
    const [file, setFile] = useState(null);
    const defaultValues = {
        username: "",
        email: "",
        oficina: "",
        telefono: "",
        cv: ""

    }
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues,
    })

    function onSubmit(values) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        // alert(JSON.stringify(values))
        toast.success('Tus datos fueron enviados correctamente.', {
            description: "Nos contactaremos contigo lo antes posible."
        })
        form.reset({
            username: "",
            email: "",
            oficina: "",
            telefono: "",
            cv: ""
        })
        guardarFomulario(values)
    }

    const handleChange = (file) => {

        console.log(file);
        setFile(file);
    };

    return (
        <div className="flex h-screen  w-full">
            {/* Mitad izquierda */}
            {/* bg-gradient-to-br from-red-600 to-red-800 */}
            <div className="w-[100%] h-[40%] sm:w-1/2  flex items-center justify-center  ">

                <Image src={Degradado}
                    width={0}

                    height={0}
                    alt=""
                    className="w-[100%] h-[40%] sm:h-full sm:w-1/2   absolute z-20 inset-0 object-cover mix-blend-multiply" />
            </div>

            {/* Mitad derecha */}
            {/* bg-gradient-to-bl from-blue-500 to-blue-800 */}
            <div className="w-[100%]  h-[50%] sm:h-full sm:mt-0 sm:w-1/2  flex items-center justify-center p-8 sm:bg-gradient-to-r sm:from-indigo-500 sm:from-10% sm:via-sky-500 via-30% sm:to-emerald-500 sm:to-90%  relative" >
                <motion.div


                    initial="initial"
                    variants={fadeInAnimationVariants}
                    whileInView="animate"
                    viewport={{ once: true }}
                    custom={1}
                    className="p-0 mt-[1000px] sm:p-6  sm:mt-[100px] sm:mx-auto items-center">
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)} className="">
                            <Card className="w-full mb-[100px] sm:mb-0 max-w-md mx-auto relative bottom-[50px] border-[1px] border-black/30">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold text-center">Ingresá tus datos</CardTitle>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    {/* sm:space-x-2 sm:justify-center sm:items-center space-y-2 */}
                                    <div className="space-y-2">


                                        <FormField
                                            control={form.control}
                                            name="email"
                                            id="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Ingresar correo" {...field} />
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <FormField
                                            control={form.control}
                                            name="oficina"
                                            id="oficina"
                                            render={({ field }) => (
                                                <FormItem>

                                                    <FormLabel>Oficina</FormLabel>

                                                    <FormControl>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Seleccioná una oficina" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>

                                                                <SelectItem value="salta">Oficinas Salta</SelectItem>
                                                                <SelectItem value="jujuy">Oficinas Jujuy</SelectItem>
                                                            </SelectContent>
                                                        </Select>

                                                    </FormControl>

                                                    <FormMessage />



                                                </FormItem>
                                            )}
                                        />
                                    </div>



                                    <div className="space-y-2">

                                        <FormField
                                            control={form.control}
                                            name="cv"
                                            id="cv"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>CV</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Ingresar nombre" {...field} type="file" />
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />


                                    </div>
                                </CardContent>

                                <CardFooter>
                                    <Button className="w-full" type="submit">Enviar</Button>
                                </CardFooter>
                            </Card>

                        </form>
                    </Form>

                </motion.div>
            </div>
        </div>
    )
}
