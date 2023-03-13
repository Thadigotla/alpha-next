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
  import { useState } from 'react';
  
  const { Title, Text } = Typography;
   
  export const PromoCodes = () => {
  
    const [form] = Form.useForm();
    const { edit, create, show } = useNavigation();
    const [visibleShowModal, setVisibleShowModal] = useState<boolean>(false);
  
  
    const { tableProps, searchFormProps, setFilters } = useTable<any>({
          resource: "promo_codes",
          metaData: {
            fields: [
              "id",
              "uid",
              "user_id",
              "product_id",
              "label",
              "code",
              "value_type",
              "value",
              "active",
              "usable_count",
              "created_at",
              "updated_at",
             { user:["id","displayName"]},
             { product:["id","name"]},
            ],
          },
          onSearch: (value: any) => [
            {
              field: "code",
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
          resource: "promo_codes",
          action: "create",
          redirect: false,
        });
  
        
          // Edit Vehicle Make Modal
    const {
      modalProps: editModalProps,
      formProps: editFormProps,
      show: editModalShow,
    } = useModalForm<any>({
      resource: "promo_codes",
      action: "edit",
      metaData: {
        fields: [
            "id",
            "uid",
            "user_id",
            "product_id",
            "label",
            "code",
            "value_type",
            "value",
            "active",
            "usable_count",
            "created_at",
            "updated_at",
           { user:["id","displayName"]},
           { product:["id","name"]},
          ],
      },
      warnWhenUnsavedChanges: true,
      redirect: false,
    });
  
    useEffect(()=>{
      
      editFormProps.form?.setFieldsValue({ user_id: editFormProps?.initialValues?.user?.id });
      editFormProps.form?.setFieldsValue({ product_id: editFormProps?.initialValues?.product?.id });
  
    },[editFormProps])
    console.log("editFormProps",editFormProps)
  
    const { queryResult, setShowId } = useShow<any>({
      resource: "customers",
      metaData: {
        fields: [            
          "id",
        "name",
        "phone_no",
         "role",],
      },
    });
  
  
      // Customers List
      const { selectProps: customerSelectProps } = useSelect<any>({
        resource: 'users_view',
        metaData: {
          fields: ['id', 'display_name'],
        },
        optionValue: 'id',
        optionLabel: 'display_name',
      });
  
  
          // Customers List
          const { selectProps: productSelectProps } = useSelect<any>({
            resource: 'products',
            metaData: {
              fields: ['id', 'name'],
            },
            optionValue: 'id',
            optionLabel: 'name',

          });
  
            
          // Customers List
          const { selectProps: valueTypeProps } = useSelect<any>({
            resource: 'enum_promo_value_type',
            metaData: {
              fields: ['value', 'comment'],
            },
            optionValue: 'value',
            optionLabel: 'comment',

          });
    // Status List
    const { selectProps: statusSelectProps } = useSelect<any>({
      resource: 'enum_order_status',
      metaData: {
        fields: ['value', 'comment'],
      },
      optionValue: 'value',
      optionLabel: 'comment',
    });
  
    const { data: showQueryResult } = queryResult;
    const record = showQueryResult?.data;
  
  
  
      return (
        <>        <List
            title={"Promo"}
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
              <Table.Column dataIndex={"uid"} title="Uid" />
              {/* <Table.Column dataIndex={"status"} title="Name" /> */}
              <Table.Column dataIndex={"status"} title="Status" />
              <Table.Column dataIndex={"label"} title="Label" />
              <Table.Column dataIndex={"code"} title="Code" />
              <Table.Column dataIndex={"value_type"} title="Value Type" />
              <Table.Column dataIndex={"value"} title="Value" />
              <Table.Column dataIndex={"quantity"} title="Quantity" />
              <Table.Column dataIndex={"active"} title="Active" />
              <Table.Column dataIndex={"usable_count"} title="Usable Count" />
  
              
              <Table.Column dataIndex={["user","name"]} title="customer" />
              <Table.Column dataIndex={["product","name"]} title="Product" />
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
                  <DeleteButton
                    resourceName="customers"
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
        <Modal {...createModalProps}   title='Create Promo'>
          <Form
            {...createFormProps}
            layout='vertical'
            initialValues={{
              active: true,
            }}
          >

            <Form.Item label='User' name='user_id'
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                        >
              <Select
                {...customerSelectProps}
     
              />
            </Form.Item>
  
  
            <Form.Item label='Product' name='product_id'
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                        >
              <Select
                {...productSelectProps}
     
              />
            </Form.Item>
  

            <Form.Item
              label='label'
              name='label'
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
  

            <Form.Item
              label='code'
              name='code'
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

 

            <Form.Item
              label='Value Type'
              name='value_type'
              rules={[
                {
                  required: true,
                },
              ]}
            >
             <Select
                {...valueTypeProps}
     
              />
            </Form.Item>

  
            <Form.Item
              label='Value'
              name='value'
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
 
            </Form.Item>
  
  
            <Form.Item
              label='Usable Count'
              name='usable_count'
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
            layout='vertical'
            // initialValues={{
            //   active: true,
            // }}
          >

            <Form.Item label='User' name='user_id'
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                        >
              <Select
                {...customerSelectProps}
     
              />
            </Form.Item>
  
  
            <Form.Item label='Product' name='product_id'
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                        >
              <Select
                {...productSelectProps}
     
              />
            </Form.Item>
  

            <Form.Item
              label='label'
              name='label'
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
  

            <Form.Item
              label='Code'
              name='code'
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

 

            <Form.Item
              label='Value Type'
              name='value_type'
              rules={[
                {
                  required: true,
                },
              ]}
            >
             <Select
                {...valueTypeProps}
     
              />
            </Form.Item>

  
            <Form.Item
              label='Value'
              name='value'
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
 
            </Form.Item>
  
  
            <Form.Item
              label='Usable Count'
              name='usable_count'
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