"use client";

import styles from "./page.module.css";
import {
  Button,
  ChakraProvider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { getRepos } from "@/app/services/githubService";
import { useState } from "react";
import RepoTable from "@/app/components/RepoTable";

export default function Home() {
  const [repos, setRepos] = useState();
  const [source, setSource] = useState();
  function validateInput(value) {
    let error;
    if (!value || value === '') {
      error = "Input is required";
    }
    return error;
  }

  // Formik is used for form validation without the need for boilerplate
  return (
    <main className={styles.main}>
      <ChakraProvider>
        <Formik
          initialValues={{
            queryValue: "",
            callType: "",
            page: "1",
            perPage: "10",
            sort: "created",
            direction: "asc",
          }}
          onSubmit={async (values, actions) => {
            const response = await getRepos(
              values.queryValue,
              values.callType,
              values.sort,
              values.perPage,
              values.direction,
              values.page,
            );
            setSource(values.queryValue);
            if (response.data) {
              setRepos(response.data);
            }
            actions.setSubmitting(false);
          }}
        >
          {(props) => (
            <Form>
              <Field name="queryValue" validate={validateInput}>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.name && form.touched.name}
                  >
                    <FormLabel size="lg">
                      Please type a Github username or org name
                    </FormLabel>
                    <Input {...field} placeholder="username or org" size="lg" />
                    <FormErrorMessage size='lg'>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="callType" as="select">
                {({ field }) => (
                  <FormControl>
                    <FormLabel size="lg">Select Type</FormLabel>
                    <Select {...field} size="lg">
                      <option value="username">Username</option>
                      <option value="org">Organization</option>
                    </Select>
                  </FormControl>
                )}
              </Field>
              <Field name="perPage">
                {({ field }) => (
                  <FormControl>
                    <FormLabel size="lg">Results per page:</FormLabel>
                    <Select {...field} size="lg">
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </Select>
                  </FormControl>
                )}
              </Field>
              <Field name="page">
                {({ field, form }) => (
                  <FormControl>
                    <FormLabel size="lg">Select page</FormLabel>
                    <NumberInput
                      {...field}
                      size="lg"
                      onChange={(val) => form.setFieldValue(field.name, val)}
                    >
                      <NumberInputField size="md" />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                )}
              </Field>
              <Field name="sort">
                {({ field }) => (
                  <FormControl>
                    <FormLabel size="lg">Sort by:</FormLabel>
                    <Select {...field} size="lg">
                      <option value="created">Created</option>
                      <option value="updated">Updated</option>
                      <option value="pushed">Pushed</option>
                      <option value="full_name">Name</option>
                    </Select>
                  </FormControl>
                )}
              </Field>
              <Field name="direction">
                {({ field }) => (
                  <FormControl>
                    <FormLabel size="lg">Direction:</FormLabel>
                    <Select {...field} size="lg">
                      <option value="asc">Ascending</option>
                      <option value="desc">Decending</option>
                    </Select>
                  </FormControl>
                )}
              </Field>
              <Button mt={4} isDisabled={props.isSubmitting} type="submit">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
        <RepoTable repos={repos} source={source} />
      </ChakraProvider>
    </main>
  );
}
