import { BottomNavigationBar } from './BottomNavigationBar'
import { AuthStackNavigator } from './AuthStack'


export const Navigation= ()=>{
    const user = false;

    return (
        user? <BottomNavigationBar /> : <AuthStackNavigator/>
    )
}