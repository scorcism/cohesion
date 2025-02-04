import { useApp } from '@/context/context/AppContext'
import { config } from '@/utils/config'
import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { Outlet } from 'react-router'

const AuthWrapper = () => {

    const { setUser } = useApp()

    // check if auth cookie available
    const auth = () => {
        const _auth_token = Cookies.get(config.AUTH_TOKEN)
        const _auth_email = Cookies.get(config.AUTH_EMAIL)

        if (!!_auth_token && !!_auth_email) {
            setUser({
                token: _auth_token,
                email: _auth_email,
            })
        }
    }

    useEffect(() => {
        auth()
    }, [])



    return <Outlet />
}

export default AuthWrapper
