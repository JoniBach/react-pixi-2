import { Button } from "../components/interface/Button";
import { File } from "../components/interface/File";
import { Input } from "../components/interface/Input";
import { List } from "../components/interface/List";
import { Modal } from "../components/interface/Modal";

const data = [
    {
      title: "test",
    },
    {
      title: "test",
    },
    {
      title: "test",
    },
  ];
  
export const Styles = () => {
  return (
    <div>
     <Modal title='styles'>
     <Button> test</Button >
      <Input label='input'/>
      <File />
      <List data={data} />
     </Modal>
    </div>
  );
};
