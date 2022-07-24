import { BottomNavigationBar } from './BottomNavigationBar'
import { AuthStackNavigator } from './AuthStack'
import { useAuthentication } from '../state'


export const Navigation= ()=>{
    const {currentUser}=useAuthentication() 

    return (
        currentUser !==null ? <BottomNavigationBar /> : <AuthStackNavigator/>
    )
}