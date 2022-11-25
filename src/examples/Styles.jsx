import { Button } from "../components/interface/Button";
import { File } from "../components/interface/File";
import { Input } from "../components/interface/Input";
import { List } from "../components/interface/List";
import { Modal } from "../components/interface/Modal";
import { Nav } from "../components/interface/Nav";

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

const handleFile = async (file) => {
  return file;
};

export const Styles = () => {
  return (
    <div>
      <Nav />
      <Modal title="styles">
        <Button> test</Button>
        <Input label="input" />
        <File onChange={handleFile} />
        <List data={data} />
      </Modal>
    </div>
  );
};
