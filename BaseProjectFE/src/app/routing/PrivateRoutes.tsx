import {lazy, FC, Suspense, useState, useEffect} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import { useAuth } from '../modules/auth'
import { getModuleByUserName } from './core/_request'
import { ModuleModel } from './core/_models'

const PrivateRoutes = () => {
  const [modules, setModules] = useState<ModuleModel[]>([]);
  const {currentUser} = useAuth()

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const { data: response } = await getModuleByUserName(currentUser?.username ?? '');
  //       setModules(response.data);
  //     } catch (error) {
  //       console.error('Error fetching modules:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))
  const componentMap = (name: string) => {
  switch (name) {
    case "ProfilePage":
      return ProfilePage;
    case 'WizardsPage':
      return WizardsPage;
    case 'AccountPage':
      return AccountPage;
    case 'WidgetsPage':
      return WidgetsPage;
    case 'ChatPage':
      return ChatPage;
    case 'UsersPage':
      return UsersPage;
    default:
      return null; // You can handle other cases or return a default component
  }
};
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        {/* Lazy Modules */}
        {/* {modules.map((module) => {
          const LazyComponent = componentMap(module.Name);
          return LazyComponent ? (
            <Route
              key={module.Id}
              path={module.FilePath.toLowerCase()}
              element={
                <SuspensedView>
                  <LazyComponent />
                </SuspensedView>
              }
            />
          ) : null;
        })} */}

        <Route
          path='crafted/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--kt-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
