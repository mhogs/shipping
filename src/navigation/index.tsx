import { BottomNavigationBar } from './BottomNavigationBar'
import { AuthStackNavigator } from './AuthStack'


export const Navigation= ()=>{
    const user = true;

    return (
        user? <BottomNavigationBar /> : <AuthStackNavigator/>
    )
}