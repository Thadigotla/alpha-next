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
  Image,
} from "@pankod/refine-antd";
import { useShow } from "@pankod/refine-core";
import { nhost } from "utility";

const { Title, Text } = Typography;

export const ProductsList = () => {
  const [form] = Form.useForm();
  const userDetails = nhost.auth.getUser();

  // State
  const [showModal, setShowModal] = useState<boolean>(false);

  // Table
  const { tableProps: MakesTableProps, searchFormProps: MakesSearchFormProps } =
    useTable<any>({
      resource: "products",
      metaData: {
        fields: [
          "id",
          "name",
          "description",
          "cost",
          "currency",
          "image_url",
          { image: ["id", "etag"] },
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
  const { queryResult, setShowId } = useShow<any>({
    resource: "pets",
    metaData: {
      fields: [
        "id",
        "name",
        "description",
        "cost",
        "currency",
        { image: ["id", "name"] },
      ],
    },
  });

  // Create Pets Modal
  const {
    modalProps: createModalProps,
    formProps: createFormProps,
    show: createModalShow,
  } = useModalForm<any>({
    resource: "products",
    action: "create",
    redirect: false,
  });

  // Edit Pets Modal
  const {
    modalProps: editModalProps,
    formProps: editFormProps,
    show: editModalShow,
  } = useModalForm<any>({
    resource: "products",
    action: "edit",
    metaData: {
      fields: [
        "id",
        "name",
        "description",
        "cost",
        "currency",
        "image_url",
        { image: ["id", "name"] },
      ],
    },
    warnWhenUnsavedChanges: true,
    redirect: false,
  });

  // // Customers List
  // const { selectProps: customerSelectProps } = useSelect<any>({
  //   resource: 'file',
  //   metaData: {
  //     fields: ['id', 'display_name'],
  //   },
  //   optionValue: 'id',
  //   optionLabel: 'display_name',
  // });

  useEffect(() => {
    editFormProps.form?.setFieldsValue({
      user_id: editFormProps?.initialValues?.customer?.display_name,
    });
  }, [editFormProps]);

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
        title={"Manage Products"}
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
          <Table.Column dataIndex={"description"} title="Description" />
          <Table.Column dataIndex={"cost"} title="Cost" />
          <Table.Column dataIndex={"currency"} title="Currency" />
          <Table.Column
            dataIndex={"image_url"}
            render={(val) => <Image height="20px" width="30px" src={val} />}
            title="Image"
          />
          {/* <Table.Column dataIndex={["image", "etag"]}  */}

          {/* render={(val) => <img src={ nhost.storage.getPublicUrl({ fileId:val })}/> } */}

          {/* /title="Product" /> */}

          <Table.Column<any>
            title="Actions"
            dataIndex="actions"
            key="actions"
            render={(_, record: any) => (
              <Space>
                <EditButton
                  hideText
                  size="small"
                  recordItemId={record.id}
                  onClick={() => editModalShow(record.id)}
                />
                {/* <ShowButton
                  hideText
                  size="small"
                  recordItemId={record.id}
                  onClick={() => {
                    setShowId(record.id);
                    setShowModal(true);
                  }}
                /> */}
                <DeleteButton
                  resource="pets"
                  size="small"
                  recordItemId={record.id}
                  hideText
                />
              </Space>
            )}
          />
        </Table>
      </List>

      {/* Create Modal */}
      <Modal {...createModalProps} title="Create Pets">
        <Form {...createFormProps} layout="vertical">
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
            label="Description"
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
            label="Currency"
            name="currency"
            rules={[
              {
                required: true,
                message: "Currency Required",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Cost"
            name="cost"
            rules={[
              {
                required: true,
                message: "Cost Required",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Image Url "
            name="image_url"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* <Form.Item
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
          <Form.Item label='Customer' name='user_id'
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                      >
            <Select
              {...customerSelectProps}
   
            />
          </Form.Item> */}
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
            label="Currency"
            name="currency"
            rules={[
              {
                required: true,
                message: "Currency Required",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Cost"
            name="cost"
            rules={[
              {
                required: true,
                message: "Cost Required",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Image Url "
            name="image_url"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* <Form.Item
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
          <Form.Item label='Customer' name='user_id'
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                      >
            <Select
              {...customerSelectProps}
   
            />
          </Form.Item> */}
        </Form>
      </Modal>
    </>
  );
};
