import React from 'react'
import { Container, Content } from './styles'
import { 
  FaTimes, 
  FaHome, 
  FaBarcode, 
  FaRegSun, 
  FaUserAlt, 
  FaClipboardList, 
  FaRegFileAlt,
  FaRegCalendarAlt,
  FaChartBar
} from 'react-icons/fa'

import SidebarItem from '../SidebarItem'

const Sidebar = ({ active }) => {

  const closeSidebar = () => {
    active(false)
  }

  return (
    <Container sidebar={active}>
      <FaTimes onClick={closeSidebar} />  
      <Content>
        <SidebarItem Icon={FaHome} Text="Home" />
        <SidebarItem Icon={FaChartBar} Text="Movimentações" />
        <SidebarItem Icon={FaUserAlt} Text="Perfil" />
        <SidebarItem Icon={FaBarcode} Text="Pagamentos" />
        <SidebarItem Icon={FaRegCalendarAlt} Text="Agendamentos" />
        <SidebarItem Icon={FaClipboardList} Text="Extratos" />
        <SidebarItem Icon={FaRegFileAlt} Text="Relatórios" />
        <SidebarItem Icon={FaRegSun} Text="Configurações" />
      </Content>
    </Container>
  )
}

export default Sidebar