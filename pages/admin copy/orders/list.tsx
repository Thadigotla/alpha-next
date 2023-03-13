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
} from "@pankod/refine-antd";

import React, { useEffect } from "react";
// import { BreadCrumb } from "components/common/BreadCrumb";

import { useNavigation, useShow } from "@pankod/refine-core";
import { useState } from "react";
import Link from "next/link";
//  import { Link } from "@pankod/refine-react-router-v6";
import { nhost } from "pages/_app";

const { Title, Text } = Typography;

export const OrdersList = () => {
  const [form] = Form.useForm();
  const userDetails = nhost.auth.getUser();

  console.log("userDetails", userDetails);

  const { edit, create, show } = useNavigation();
  const [visibleShowModal, setVisibleShowModal] = useState<boolean>(false);

  const { tableProps, searchFormProps, setFilters } = useTable<any>({
    resource: "orders",
    metaData: {
      fields: [
        "id",
        "status",
        "total_amount",
        "created_at",
        "updated_at",
        { user: ["id", "displayName"] },
      ],
    },
    permanentFilter: userDetails?.id
      ? [{ field: "order_user_id", operator: "eq", value: userDetails?.id }]
      : [],

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
    resource: "orders",
    action: "edit",
    metaData: {
      fields: [
        "id",
        "status",
        "uuid",
        "test_type",
        "created_at",
        "updated_at",
        { user: ["id", "name"] },
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

  useEffect(() => {
    createFormProps.form?.setFieldsValue({ customer_id: userDetails?.id });
  }, [createFormProps]);

  console.log("editFormProps", editFormProps);

  const { queryResult, setShowId } = useShow<any>({
    resource: "customers",
    metaData: {
      fields: ["id", "name", "phone_no", "role"],
    },
  });

  // Customers List
  const { selectProps: customerSelectProps } = useSelect<any>({
    resource: "customers",
    metaData: {
      fields: ["id", "name"],
    },
    optionValue: "id",
    optionLabel: "name",
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

  if (!userDetails?.id) return null;

  return (
    <>
      {" "}
      <List
        title={"Orders"}
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
          <Table.Column
            dataIndex={"id"}
            title="Id"
            render={(val) => (
              <Link href={`/user/order/detail/${val}`}>{val}</Link>
              // <Link to={`/user/order/detail/${val}`}>{val}</Link>
            )}
          />
          {/* <Table.Column dataIndex={"status"} title="Name" /> */}
          <Table.Column dataIndex={"status"} title="Status" />
          <Table.Column dataIndex={"total_amount"} title="Total Amount" />

          <Table.Column dataIndex={["user", "displayName"]} title="Customer" />
          <Table.Column dataIndex={"created_at"} title="Created At" />
          <Table.Column dataIndex={"updated_at"} title="Updated At" />

          {/* <Table.Column<any>
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
 
                <DeleteButton
                  resourceName="customers"
                  size="small"
                  recordItemId={record.id}
                  hideText
                />
              </Space>
            )}
          /> */}
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

          <Form.Item hidden={true} label="Customer" name="customer_id">
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
            <Select {...productSelectProps} />
          </Form.Item>

          {/* <Form.Item
            label='Status'
            name='status'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item> */}

          {/* <Form.Item label='Status' name='status' 
                                rules={[
                                  {
                                    required: true,
                                  },
                                ]}
                                >
            <Select
              {...statusSelectProps}
   
            />
          </Form.Item> */}

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

          <Form.Item label="Customer" name="customer_id">
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
            <Select {...productSelectProps} />
          </Form.Item>

          {/* <Form.Item
            label='Status'
            name='status'
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item> */}

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
    </>
  );
};
