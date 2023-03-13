import {
  Table,
  useTable,
  Form,
  Input,
  List,
  EditButton,
  ShowButton,
  useModalForm,
  Typography,
  Modal,
  useSelect,
  Select,
  DeleteButton,
  Space,
  Upload,
  Button,
  UploadProps,
  UploadFile,
} from "@pankod/refine-antd";

import React, { useEffect } from 'react';

 

// import { BreadCrumb } from "components/common/BreadCrumb";

import {
  useNavigation,
  useShow,
  useUpdate,
  LayoutWrapper,
} from "@pankod/refine-core";
import { useState } from "react";
// import { useParams } from "@pankod/refine-react-router-v6";
import { useRouter } from "next/router";
import { nhost } from "pages/_app";

 // import { EyeOutlined, UploadOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export const AdminOrdersDetailsList = () => {
  const router = useRouter();
  const { id:parent_id } = router.query;

  // const { id: parent_id } = useParams();
  const { push } = useNavigation();

  console.log("Id is", parent_id);
  const handleValidate = async () => {
    const isValid = await form.validateFields(["document_name"]);
    if (isValid) {
    }
  };

  const [form] = Form.useForm();
  const { edit, create, show } = useNavigation();
  const [visibleShowModal, setVisibleShowModal] = useState<boolean>(false);

  const { tableProps, searchFormProps, setFilters } = useTable<any>({
    resource: "order_details",
    metaData: {
      fields: [
        "id",
        "status",
        // "uuid",
        "test_type",
        "quantity",
        "created_at",
        "updated_at",
        "report",
        { customer: ["id", "displayName"] },
        { product: ["id", "name"] },
      ],
    },
    permanentFilter: [
      {
        field: "order_id",
        operator: "eq",
        value: parent_id,
      },
    ],

    onSearch: (value: any) => [
      {
        field: "test_type",
        operator: "contains",
        value: `%${value.q}%`,
      },
    ],

    initialSorter: [
      {
        field: "created_at",
        order: "desc",
      },
    ],
  });

  const {
    modalProps: createModalProps,
    formProps: createFormProps,
    show: createModalShow,
  } = useModalForm<any>({
    resource: "orders",
    action: "create",
    redirect: false,
  });

  // Edit Vehicle Make Modal
  const {
    modalProps: editModalProps,
    formProps: editFormProps,
    show: editModalShow,
  } = useModalForm<any>({
    resource: "order_details",
    action: "edit",
    metaData: {
      fields: [
        "id",
        "status",
        // "uuid",
        "test_type",
        "created_at",
        "updated_at",
        "report",
        { customer: ["id", "displayName"] },
        { product: ["id", "name"] },
      ],
    },
    warnWhenUnsavedChanges: true,
    redirect: false,
  });

    useEffect(() => {
    editFormProps.form?.setFieldsValue({
      customer_id: editFormProps?.initialValues?.customer?.id,
    });
    editFormProps.form?.setFieldsValue({
      product_id: editFormProps?.initialValues?.product?.id,
    });
  }, [editFormProps]);
  console.log("editFormProps", editFormProps);

  const { queryResult, setShowId } = useShow<any>({
    resource: "customers",
    metaData: {
      fields: ["id", "name", "phone_no", "role"],
    },
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

  // Customers List
  const { selectProps: productSelectProps } = useSelect<any>({
    resource: "products",
    metaData: {
      fields: ["id", "name"],
    },
    optionValue: "id",
    optionLabel: "name",
  });

  // Status List
  const { selectProps: statusSelectProps } = useSelect<any>({
    resource: "enum_order_status",
    metaData: {
      fields: ["value", "comment"],
    },
    optionValue: "value",
    optionLabel: "comment",
  });

  const { data: showQueryResult } = queryResult;
  const record = showQueryResult?.data;

  const [image_url, setImageUrl] = useState();

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { mutateAsync: uploadedFileRecord } = useUpdate<any>();

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: async (file) => {
      setFileList([...fileList, file]);

      let url = await nhost.storage.upload({
        file,
      });

      if (url?.fileMetadata) {
        editFormProps?.form?.setFieldsValue({
          report: nhost.storage.getPublicUrl({
            fileId: url?.fileMetadata?.id,
          }),
        });

        // await uploadedFileRecord({
        //   resource: "order_details",
        //   id: parent_id,
        //   values: {

        //     url: url.fileMetadata,
        //   },
        // });
      }

      // console.log("document data", document);
      // console.log("documentName data", documentName);

      return false;
    },
  };

  return (
    <>
      <LayoutWrapper >
        <List
          title={"Order Items"}
          // createButtonProps={{
          //   style: {
          //     backgroundColor: "#2a3042",
          //     border: "unset",
          //     outline: "unset",
          //     color: "#fff",
          //   },
          //   onClick: () => {
          //     createModalShow();
          //   },
          // }}
          // breadcrumb={<BreadCrumb data={["Underwriting", "Client", "List"]} />}
        >
          <Form form={form} layout="inline" {...searchFormProps}>
            <Form.Item name="q">
              <Input
                style={{ minWidth: "400px", margin: "20px 0" }}
                placeholder="Search by Type"
                // onChange={(e) => {
                //   setFilters([
                //     {
                //       operator: "or",
                //       value: [
                //         {
                //           field: "nic_brn",
                //           operator: "contains",
                //           value: `%${e.target.value}%`,
                //         },
                //         {
                //           field: "firstname",
                //           operator: "contains",
                //           value: `%${e.target.value}%`,
                //         },
                //         {
                //           field: "family_name",
                //           operator: "contains",
                //           value: `%${e.target.value}%`,
                //         },
                //       ],
                //     },
                //   ]);
                // }}
              />
            </Form.Item>
          </Form>

          <Table className="custom-table" {...tableProps} rowKey="id">
            <Table.Column dataIndex={"id"} title="Id" />

            {/* <Table.Column dataIndex={"status"} title="Name" /> */}
            <Table.Column dataIndex={"status"} title="Status" />
            <Table.Column dataIndex={"test_type"} title="Test Type" />
            <Table.Column dataIndex={"quantity"} title="Quantity" />
            <Table.Column
              dataIndex={"report"}
              title="Report"
              render={(_, record: any) => (
                <a rel="noreferrer" target={"_blank"} href={record.report}>
                  {/* <EyeOutlined /> */}
                </a>
              )}
            />

            <Table.Column
              dataIndex={["customer", "displayName"]}
              title="Customer"
            />

            <Table.Column dataIndex={["product", "name"]} title="Product" />

            <Table.Column dataIndex={"created_at"} title="Created At" />
            <Table.Column dataIndex={"updated_at"} title="Updated At" />

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
                    setVisibleShowModal(true);
                  }}
                /> */}
                  {/* <DeleteButton
                  resourceName="customers"
                  size="small"
                  recordItemId={record.id}
                  hideText
                /> */}
                </Space>
              )}
            />
          </Table>
        </List>
        {/* Create Modal */}
        <Modal {...createModalProps} title="Create Order">
          <Form
            {...createFormProps}
            layout="vertical"
            initialValues={{
              active: true,
            }}
          >
            {/* <Form.Item
            label='Customer'
            name='customer'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item> */}

            <Form.Item
              label="Customer"
              name="customer_id"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select {...customerSelectProps} />
            </Form.Item>

            <Form.Item
              label="Product"
              name="product_id"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select mode="multiple" {...productSelectProps} />
            </Form.Item>

            <Form.Item
              label="Status"
              name="status"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select {...statusSelectProps} />
            </Form.Item>

            <Form.Item
              label="Test Type"
              name="test_type"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
        <Modal {...editModalProps}>
          <Form
            {...editFormProps}
            layout="vertical"
            // initialValues={{
            //   active: true,
            // }}
          >
            {/* 
          <Form.Item label="Customer" name="customer_id">
            <Select {...customerSelectProps} />
          </Form.Item> */}
            {/* <Form.Item
            label="Product"
            name="product_id"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select {...productSelectProps} />
          </Form.Item> */}

            <Form.Item
              label="Report"
              name="report"
              rules={[
                {
                  required: true,
                  message: "Please input report url",
                },
              ]}
            >
              <Input onChange={handleValidate} />
            </Form.Item>

            <Upload {...props} listType="picture">
              <Button
                size="middle"
                type="primary"
                // htmlType="submit"
                // icon={<UploadOutlined />}
              >
                Upload Document
              </Button>
            </Upload>

            <Form.Item label="Status" name="status">
              <Select {...statusSelectProps} />
            </Form.Item>

            <Form.Item
              label="Test Type"
              name="test_type"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            {/* 
          <Form.Item
            label="Status"
            name="status"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item> */}

            {/* 
          
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item> */}
          </Form>
        </Modal>
        <Modal
          visible={visibleShowModal}
          onCancel={() => setVisibleShowModal(false)}
          title="Show post"
        >
          <Title level={5}>Id</Title>
          <div>{record?.id}</div>

          <Title level={5}>Title</Title>
          <div>{record?.title}</div>

          <Title level={5}>Active</Title>
          <div>{`${record?.active}`}</div>
        </Modal>
      </LayoutWrapper>
    </>
  );
};
