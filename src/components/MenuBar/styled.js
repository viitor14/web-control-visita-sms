import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { RiDashboardFill } from 'react-icons/ri';
import { IoPeopleSharp } from 'react-icons/io5';
import { MdPlace } from 'react-icons/md';
import { LuLogOut } from 'react-icons/lu';

export const Olas = styled.section`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const AsideDashboard = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 250px;
  height: 100%;
  border-right: 1px solid rgba(0, 0, 0, 0.4);
`;

export const DivItensNavsAside = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
`;

export const DivIconNavAside = styled(NavLink)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 6px;
  border-radius: 8px;
  gap: 10px;

  span {
    color: #001f41;
  }

  p {
    font-weight: 500;
  }

  &.active {
    background-color: #fdcd30; /* Cor de fundo quando ativo */
    color: #ffffff; /* Cor do texto/ícone quando ativo */
    font-weight: 600;
  }

  &:hover:not(.active) {
    background-color: #eef2f5; /* Efeito hover suave quando não está ativo */
  }
`;

export const DashboardIcon = styled(RiDashboardFill)`
  width: 40px;
  height: 40px;
  color: #2b69ad;
`;

export const PeopleIcon = styled(IoPeopleSharp)`
  width: 40px;
  height: 40px;
  color: #2b69ad;
`;

export const PlaceIcon = styled(MdPlace)`
  width: 40px;
  height: 40px;
  color: #2b69ad;
`;

export const DivButtonDesconectar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-top: 1px solid rgba(0, 0, 0, 0.4);
  padding: 20px;
  p {
    font-weight: 400;
    color: #5d5d5d;
    padding: 6px;
    &:hover {
      cursor: pointer;
      font-weight: 700;
      border-radius: 8px;
      transition: 0.5s all ease-in-out;
    }
  }
`;

export const LogOutIcon = styled(LuLogOut)`
  width: 20px;
  height: 20px;
  color: #5d5d5d;
`;
