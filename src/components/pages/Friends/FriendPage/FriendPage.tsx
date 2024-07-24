import React from 'react';
import { Layout, Grid, Switch } from 'antd';
import FriendMain from './FriendMain';
const { Content } = Layout;
const { useBreakpoint } = Grid;

const FriendPage = () => {
  const screens = useBreakpoint();

  return (
	<Layout style={{ marginLeft: screens.xs ? 80 : 256, transition: 'margin-left 0.2s' }}>
		<Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
			<FriendMain></FriendMain>
		</Content>
	</Layout>
  );
};

export default FriendPage;