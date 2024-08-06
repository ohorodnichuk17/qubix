import React, { useState } from 'react';
import { Button, Radio, message } from 'antd';
import { apiClient } from '../../../../utils/api/apiClient';

const OnlineStatusPage: React.FC = () => {
   const [status, setStatus] = useState<boolean | undefined>(undefined);

   // Функція для збереження статусу на сервері
   const saveStatus = async (newStatus: boolean) => {
      try {
         await apiClient.put('api/user-profile/edit-profile', {
            isOnline: newStatus,
         });
         message.success('Статус успішно оновлено');
      } catch (error) {
         message.error('Не вдалося оновити статус');
      }
   };

   // Обробник зміни радіо кнопок
   const handleStatusChange = (e: any) => {
      const newStatus = e.target.value;
      setStatus(newStatus);
      saveStatus(newStatus);
   };

   return (
      <div style={{ padding: '20px' }}>
         <h2>Налаштування онлайн статусу</h2>
         <Radio.Group onChange={handleStatusChange} value={status}>
            <Radio value={true}>Показати онлайн статус</Radio>
            <Radio value={false}>Сховати онлайн статус</Radio>
         </Radio.Group>
         <Button
            type="primary"
            onClick={() => {
               if (status !== undefined) {
                  saveStatus(status);
               } else {
                  message.warning('Оберіть статус перед збереженням');
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
