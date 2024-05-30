import { Add, Close } from "@mui/icons-material";
import { useForm } from "react-hook-form";

import { devNotes } from "../devData/devNotes";
import { sendForm } from "../services/database";

import {
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  IconButton,
} from "@mui/material";
import Form from "../ui/Form";
import InputField from "../ui/InputField";
import NotesList from "../ui/NotesList";

const Home = () => {
  const { formState, reset, handleSubmit, control, register, watch } = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const { errors } = formState;

  const submitForm = async (data) => {
    await sendForm(data);
  };

  return (
    <Grid container className="mx-auto flex w-[85%] flex-col gap-10">
      <Grid item>
        <Form
          onSubmit={handleSubmit(submitForm)}
          controller={control}
          className="mx-auto mt-5 w-[350px] transition-all md:w-[500px]"
          noValidate
        >
          <Card className="relative rounded-lg bg-slate-400 object-cover shadow duration-500">
            <CardContent className="flex flex-col px-0 py-0">
              <InputField
                fullWidth
                variant="standard"
                name="title"
                id="title"
                register={{
                  ...register("title", {
                    required: "Please provide the note title",
                  }),
                }}
                error={errors.title}
                controller={control}
                placeholder="Title"
                InputProps={{
                  className:
                    "w-full px-4 py-2 bg-slate-400 focus-within:shadow-inset transition-all duration-500",
                }}
                helperText={errors?.title?.message}
                FormHelperTextProps={{
                  className: "bg-red-500 px-2 pt-2 !text-white -mt-1",
                }}
              />
              <Divider variant="full" className="bg-slate-900" />
              <InputField
                variant="standard"
                fullWidth
                multiline
                rows={3}
                name="content"
                id="content"
                error={errors.content}
                register={{
                  ...register("content", {
                    required: "Please provide the note content",
                  }),
                }}
                placeholder="Content"
                InputProps={{
                  className:
                    "w-full px-4 py-2 bg-slate-400 focus-within:shadow-inset transition-all duration-500",
                }}
                helperText={errors?.content?.message}
                FormHelperTextProps={{
                  className: "bg-red-500 px-2 pt-2 !text-white -mt-1",
                }}
              />
            </CardContent>
            <CardActions className="flex justify-end border-t-[1px] border-t-slate-900 bg-slate-500 py-2">
              <IconButton
                className="bg-slate-700 text-slate-400 transition-all duration-500 hover:scale-105 hover:bg-slate-900 hover:shadow"
                hidden={!formState.isDirty}
                onClick={() => reset()}
              >
                <Close />
              </IconButton>
              <IconButton
                type="submit"
                className="bg-slate-700 text-slate-400 transition-all duration-500 hover:scale-105 hover:bg-slate-900 hover:shadow"
                disabled={errors.content || errors.title}
              >
                <Add />
              </IconButton>
            </CardActions>
          </Card>
        </Form>
      </Grid>
      <Grid item>
        <NotesList notes={devNotes} />
      </Grid>
    </Grid>
  );
};

export default Home;
