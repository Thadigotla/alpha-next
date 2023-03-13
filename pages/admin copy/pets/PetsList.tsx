import { useState, useEffect } from "react";
import {
  DeleteButton,
  EditButton,
  Form,
  Input,
  List,
  Modal,
  Radio,
  ShowButton,
  Space,
  Table,
  Typography,
  Badge,
  Select,
  useModalForm,
  useTable,
  useSelect,
} from "@pankod/refine-antd";
import { useShow } from "@pankod/refine-core";
import { nhost } from "pages/_app";
 
interface IPets {
  id: any;
  name: any;
  type: any;
  gender: any;
  date_of_birth: any;
  description: any;
  uuid: any;
  user: any;
}
interface ICommonEnum {
  value: any;
  label: any;
}

const { Title, Text } = Typography;

export const PetsList = () => {
  const [form] = Form.useForm();
  const userDetails = nhost.auth.getUser();

  // State
  const [showModal, setShowModal] = useState<boolean>(false);

  // Table
  const { tableProps: MakesTableProps, searchFormProps: MakesSearchFormProps } =
    useTable<IPets>({
      resource: "pets",
      metaData: {
        fields: [
          "id",
          "name",
          "type",
          "gender",
          "date_of_birth",
          "description",
          "uuid",
          { user: ["id", "displayName"] },
        ],
      },
      permanentFilter: userDetails?.id
        ? [{ field: "user_id", operator: "eq", value: userDetails?.id }]
        : [],

      onSearch: (value: any) => [
        {
          field: "name",
          operator: "contains",
          value: `%${value.q}%`,
        },
      ],
    });

  // Show Pets By Selected ID
  const { queryResult, setShowId } = useShow<IPets>({
    resource: "pets",
    metaData: {
      fields: [
        "id",
        "name",
        "type",
        "gender",
        "date_of_birth",
        "description",
        "uuid",
        { user: ["id", "displayName"] },
      ],
    },
  });

  // Create Pets Modal
  const {
    modalProps: createModalProps,
    formProps: createFormProps,
    show: createModalShow,
  } = useModalForm<IPets>({
    resource: "pets",
    action: "create",
    redirect: false,
  });

  // Edit Pets Modal
  const {
    modalProps: editModalProps,
    formProps: editFormProps,
    show: editModalShow,
  } = useModalForm<IPets>({
    resource: "pets",
    action: "edit",
    metaData: {
      fields: [
        "id",
        "name",
        "type",
        "gender",
        "date_of_birth",
        "description",
        "uuid",
        { user: ["id", "displayName"] },
      ],
    },
    warnWhenUnsavedChanges: true,
    redirect: false,
  });

  // Customers List
  const { selectProps: customerSelectProps } = useSelect<any>({
    resource: "users_view",
    metaData: {
      fields: ["id", "display_name"],
    },
    optionValue: "id",
    optionLabel: "display_name",
  });

  // useEffect(()=>{

  //   editFormProps.form?.setFieldsValue({ user_id: editFormProps?.initialValues?.customer?.display_name });

  // },[editFormProps])

  useEffect(() => {
    editFormProps.form?.setFieldsValue({
      user_id: editFormProps?.initialValues?.customer?.id,
    });
    editFormProps.form?.setFieldsValue({
      product_id: editFormProps?.initialValues?.product?.id,
    });
  }, [editFormProps]);

  useEffect(() => {
    createFormProps.form?.setFieldsValue({ user_id: userDetails?.id });
  }, [createFormProps]);

  // Destructing API Response
  const { data: showQueryResult } = queryResult;
  const record = showQueryResult?.data;

  //   // Form Watch
  //   const createFormWatch = {
  //     insuranceType: Form.useWatch("insurance_type", createFormProps.form),
  //   };

  //   const editFormWatch = {
  //     insuranceType: Form.useWatch("insurance_type", editFormProps.form),
  //   };

  // Form Handlers
  const onInsuranceTypeChange = (operationMode: string, value: any) => {
    if (operationMode === "create") {
      if (value === "motor") {
        createFormProps.form?.setFieldsValue({ category: "", fsc_code: "04" });
      } else {
        createFormProps.form?.setFieldsValue({ category: "", fsc_code: "07" });
      }
    } else {
      if (value === "motor") {
        editFormProps.form?.setFieldsValue({ category: "", fsc_code: "04" });
      } else {
        editFormProps.form?.setFieldsValue({ category: "", fsc_code: "07" });
      }
    }
  };

  return (
    <>
      <Form form={form} layout="inline" {...MakesSearchFormProps}>
        <Form.Item name="q">
          <Input
            style={{ minWidth: "400px", margin: "20px 0" }}
            placeholder="Search Pets"
          />
        </Form.Item>
      </Form>
      <List
        title={"Manage Pets"}
        createButtonProps={{
          style: {
            backgroundColor: "#2a3042",
            border: "unset",
            outline: "unset",
            color: "#fff",
          },
          onClick: () => {
            createModalShow();
          },
        }}
      >
        <Table className="custom-table" {...MakesTableProps} rowKey="id">
          <Table.Column dataIndex={"name"} title="Name" />
          <Table.Column dataIndex={"type"} title="Type" />
          <Table.Column dataIndex={"gender"} title="Gender" />
          <Table.Column dataIndex={"date_of_birth"} title="Age" />
          <Table.Column dataIndex={"description"} title="Description" />
          <Table.Column dataIndex={["user", "displayName"]} title="Customer" />

          <Table.Column<IPets>
            title="Actions"
            dataIndex="actions"
            key="actions"
            render={(_, record: IPets) => (
              <Space>
                <EditButton
                  hideText
                  size="small"
                  recordItemId={record.id}
                  onClick={() => editModalShow(record.id)}
                />
                <ShowButton
                  hideText
                  size="small"
                  recordItemId={record.id}
                  onClick={() => {
                    setShowId(record.id);
                    setShowModal(true);
                  }}
                />
                <DeleteButton
                  resource="pets"
                  size="small"
                  recordItemId={record.uuid}
                  hideText
                />
              </Space>
            )}
          />
        </Table>
      </List>

      {/* Create Modal */}
      <Modal {...createModalProps} title="Create Pets">
        <Form
          {...createFormProps}
          layout="vertical"
          initialValues={{
            active: true,
          }}
        >
          <Form.Item
            label="name"
            name="name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="type"
            name="type"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item hidden={true} label="Customer" name="user_id">
            <Select {...customerSelectProps} />
          </Form.Item>

          <Form.Item
            label="gender"
            name="gender"
            rules={[
              {
                required: true,
                message: "Insurance Type Required",
              },
            ]}
          >
            <Input />
          </Form.Item>
          {/* <Select
              {...InsuranceTypeSelectProps}
              onChange={(e) => onInsuranceTypeChange("create", e)}
            />
          </Form.Item>
          <Form.Item label="description" name="description">
            <Select {...categorySelectProps} />
          </Form.Item> */}
          <Form.Item
            label="description"
            name="description"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="date_of_birth"
            name="date_of_birth"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Customer" name="user_id" hidden={true}>
            <Select {...customerSelectProps} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Modal */}
      <Modal {...editModalProps} title="Edit Pets">
        <Form {...editFormProps} layout="vertical">
          <Form.Item
            label="name"
            name="name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="type"
            name="type"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="gender"
            name="gender"
            rules={[
              {
                required: true,
                message: "Gender Required",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="date_of_birth"
            name="date_of_birth"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Customer" name="user_id" hidden={true}>
            <Select {...customerSelectProps} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Show Modal */}
      <Modal
        visible={showModal}
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
        title="Show Pets"
      >
        "id", "name", "type", "gender", "date_of_birth", "description", "uuid",
        <Title level={5}>gender</Title>
        <Text>{record?.gender}</Text>
        <Title level={5}>name</Title>
        <Text>{record?.name}</Text>
        <Title level={5}>Description</Title>
        <Text>{record?.description}</Text>
        <Title level={5}>date_of_birth</Title>
        <Text>{record?.date_of_birth}</Text>
        <Title level={5}>type</Title>
        <Text>{record?.type}</Text>
      </Modal>
    </>
  );
};
