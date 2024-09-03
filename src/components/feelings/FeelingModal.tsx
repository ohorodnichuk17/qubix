import { Flex, Modal, Tabs, type TabsProps, message } from "antd";
import { useEffect, useState } from "react";
import { apiClient } from "../../utils/api/apiClient";
import { ACTION_OPTIONS, FEELING_OPTIONS } from "./constants";
import type { ISubAction, IAction, IFeeling } from "./types";
import SubActions from "./components/SubActions";

type FeelingModalProps = {
   isModalOpen: boolean;
   handleOk: (newFeeling: IFeeling | undefined) => void;
   handleChangeAction: (newAction: IAction | undefined) => void;
   handleChangeSubAction: (newAction: ISubAction | undefined) => void;
   handleCancel: () => void;
};


const FeelingModal = ({
   isModalOpen,
   handleOk,
   handleChangeAction,
   handleChangeSubAction,
   handleCancel,
}: FeelingModalProps) => {
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

   const getSelectedFeelingId = () => {
      if (!selectedFeeling) return;
      const feeling = feelingsFromApi.find(
         (feeling) => feeling.name === selectedFeeling.name,
      );
      console.log(feeling);
      if (feeling !== null && feeling !== undefined) {
         feeling.emoji = selectedFeeling.emoji;
         return feeling;
      }
   };

   const getSelectedAction = (selectedAction: IAction | undefined) => {
      if (!selectedAction) return;
      const action = actionsFromApi.find(
         (action) => action.name === selectedAction.name,
      );
      if (action !== null && action !== undefined) {
         action.emoji = selectedAction.emoji;
         return action;
      }
   };

   const getSelectedSubAction = (selectedSubAction: ISubAction | undefined) => {
      if (!selectedSubAction) return;
      const subAction = subActionsFromApi.find(
         (subAction) => subAction.name === selectedSubAction.name,
      );
      if (subAction !== null && subAction !== undefined) {
         subAction.emoji = selectedSubAction.emoji;
         return subAction;
      }
   };

   const onOk = () => {
      handleChangeSubAction(getSelectedSubAction(selectedSubAction));
      handleChangeAction(getSelectedAction(selectedAction));
      handleOk(getSelectedFeelingId());
   };

   const items: TabsProps["items"] = [
      {
         key: "1",
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
         key: "2",
         label: "Actions",
         children: (
            <Flex wrap="wrap" gap="middle">
               {isSubActionsTabOpen && (
                  <SubActions
                     action={selectedAction}
                     setIsSubActionsTabOpen={setIsSubActionsTabOpen}
                     selectedSubAction={selectedSubAction}
                     setSelectedSubAction={setSelectedSubAction}
                     handleChangeSubAction={handleChangeSubAction}
                     getSelectedSubAction={getSelectedSubAction}
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
                           onClick={() => {
                              setSelectedAction(action);
                              setIsSubActionsTabOpen(true);
                              handleChangeAction(getSelectedAction(action));
                           }}
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

   return (
      <Modal
         title="How are you feeling ?"
         open={isModalOpen}
         onOk={onOk}
         onCancel={handleCancel}
      >
         <Tabs defaultActiveKey="1" items={items} />
      </Modal>
   );
};

export default FeelingModal;
