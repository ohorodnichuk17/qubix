import { Flex, Modal, Tabs, type TabsProps, message } from "antd";
import { useEffect, useState } from "react";
import { apiClient } from "../../utils/api/apiClient";
import { ACTION_OPTIONS, FEELING_OPTIONS } from "./constants";
import type { ISubAction, IAction, IFeeling } from "./types";
import SubActions from "./components/SubActions";
import getSelectedItem from "./utils/getSelectedItem";

type FeelingModalProps = {
   isModalOpen: boolean;
   selectedTab: "feelings" | "actions";
   handleOk: (newFeeling: IFeeling | undefined) => void;
   handleChangeAction: (newAction: IAction | undefined) => void;
   handleChangeSubAction: (newAction: ISubAction | undefined) => void;
   handleCancel: () => void;
};

const FeelingModal = ({
   isModalOpen,
   selectedTab,
   handleOk,
   handleChangeAction,
   handleChangeSubAction,
   handleCancel,
}: FeelingModalProps) => {
   const [activeKey, setActiveKey] = useState<"feelings" | "actions">(selectedTab);

   const [selectedFeeling, setSelectedFeeling] = useState<IFeeling>();
   const [selectedAction, setSelectedAction] = useState<IAction>();
   const [selectedSubAction, setSelectedSubAction] = useState<ISubAction>();

   const [isSubActionsTabOpen, setIsSubActionsTabOpen] =
      useState<boolean>(false);

   const [feelingsFromApi, setFeelingsFromApi] = useState<IFeeling[]>([]);
   const [actionsFromApi, setActionsFromApi] = useState<IAction[]>([]);
   const [subActionsFromApi, setSubActionsFromApi] = useState<ISubAction[]>([]);

   useEffect(() => {
      apiClient
         .get("/api/feeling/getAll")
         .then((res) => {
            setFeelingsFromApi(res.data);
         })
         .catch(() => {
            message.error("Feelings loading error!");
         });
      apiClient
         .get("/api/action/getAll")
         .then((res) => {
            setActionsFromApi(res.data);
         })
         .catch(() => {
            message.error("Actions loading error!");
         });
      apiClient
         .get("/api/subAction/getAll")
         .then((res) => {
            setSubActionsFromApi(res.data);
         })
         .catch(() => {
            message.error("Actions loading error!");
         });
   }, []);

   const onActionChange = (action: IAction) => {
      setSelectedAction(action);
      setIsSubActionsTabOpen(true);
      handleChangeAction(getSelectedItem(action, actionsFromApi));
   }

   const onSubActionChange = (subAction: ISubAction) => {
      setSelectedSubAction(subAction);
      handleChangeSubAction(getSelectedItem(subAction, subActionsFromApi));
   }

   const onOk = () => {
      handleChangeSubAction(getSelectedItem(selectedSubAction, subActionsFromApi));
      handleChangeAction(getSelectedItem(selectedAction, actionsFromApi));
      handleOk(getSelectedItem(selectedFeeling, feelingsFromApi));
   };

   const items: TabsProps["items"] = [
      {
         key: "feelings",
         label: "Feelings",
         children: (
            <Flex wrap="wrap" gap="middle">
               {FEELING_OPTIONS.map((feeling) => (
                  <Flex
                     key={feeling.name}
                     gap="small"
                     align="center"
                     style={{
                        width: "45%",
                        padding: "5px",
                        borderRadius: "8px",
                        background:
                           feeling.name === (selectedFeeling?.name) ? "gray" : "none",
                        color:
                           feeling.name === selectedFeeling?.name ? "white" : "black",
                        transition: ".7s",
                     }}
                     onClick={() => setSelectedFeeling(feeling)}
                  >
                     <img
                        src={feeling.emoji}
                        alt="Feeling icon (emoji)"
                        className="h-50px"
                     />
                     <span>{feeling.name}</span>
                  </Flex>
               ))}
            </Flex>
         ),
      },
      {
         key: "actions",
         label: "Actions",
         children: (
            <Flex wrap="wrap" gap="middle">
               {isSubActionsTabOpen && (
                  <SubActions
                     action={selectedAction}
                     setIsSubActionsTabOpen={setIsSubActionsTabOpen}
                     selectedSubAction={selectedSubAction}
                     onSubActionChange={onSubActionChange}
                  />
               )}
               {!isSubActionsTabOpen && (
                  <>
                     {ACTION_OPTIONS.map((action) => (
                        <Flex
                           key={action.name}
                           gap="small"
                           align="center"
                           style={{
                              width: "45%",
                              padding: "5px",
                              borderRadius: "8px",
                              background:
                                 action.name === selectedAction?.name ? "gray" : "none",
                              color:
                                 action.name === selectedAction?.name ? "white" : "black",
                              transition: ".7s",
                           }}
                           onClick={() => { onActionChange(action) }}
                        >
                           <img
                              src={action.emoji}
                              alt="Feeling icon (emoji)"
                              className="h-50px"
                           />
                           <span>{action.name}</span>
                        </Flex>
                     ))}
                  </>
               )}
            </Flex>
         ),
      },
   ];

   const changeTab = (activeKey: string) => setActiveKey(activeKey as "feelings" | "actions");

   return (
      <Modal
         title="How are you feeling ?"
         open={isModalOpen}
         onOk={onOk}
         onCancel={handleCancel}
      >
         <Tabs activeKey={activeKey} onChange={changeTab} items={items} />
      </Modal>
   );
};

export default FeelingModal;
