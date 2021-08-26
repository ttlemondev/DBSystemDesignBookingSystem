import Head from 'next/head'
import {useRouter} from "next/router"

export default function Booking(props) {
    return(
        <div>
            {props.username}
        </div>
    )
}

export async function getServerSideProps(context) {
    let username = context.query.username
    if(username == undefined) {
        return {
            props: {},
            redirect: {
                destination: '/',
                permanent: false
            },
        }
    } else {
        return {
            props: {
                username: username,
            },
        }
    }
}