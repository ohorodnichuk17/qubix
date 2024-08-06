import React, { useState } from 'react';
import { Button, Radio, message } from 'antd';
import { apiClient } from '../../../../utils/api/apiClient';
import { useAppSelector } from '../../../../hooks/redux';

const OnlineStatusPage: React.FC = () => {
   const { user } = useAppSelector(state => state.account);
   const [status, setStatus] = useState<boolean | undefined>(undefined);

   const saveStatus = async (newStatus: boolean) => {
      try {
         await apiClient.put(
            "api/user-profile/edit-profile",
            {
               userId: user?.id,
               isOnline: newStatus,
            },
            {
               headers: {
                  "Content-Type": "multipart/form-data",
               },
            },
         );
         message.success('Status successfully updated');
      } catch (error) {
         message.error('Failed to update status');
      }
   };

   const handleStatusChange = (e: any) => {
      const newStatus = e.target.value;
      setStatus(newStatus);
      saveStatus(newStatus);
   };

   return (
      <div style={{ padding: '20px' }}>
         <h2>Online status</h2>
         <Radio.Group onChange={handleStatusChange} value={status}>
            <Radio value={true}>Show online status</Radio>
            <Radio value={false}>Hide online status</Radio>
         </Radio.Group>
         <Button
            type="primary"
            onClick={() => {
               if (status !== undefined) {
                  saveStatus(status);
               } else {
                  message.warning('Choose a status before saving');
               }
            }}
            style={{ marginTop: '20px' }}
         >
            Зберегти
         </Button>
      </div>
   );
};

export default OnlineStatusPage;
