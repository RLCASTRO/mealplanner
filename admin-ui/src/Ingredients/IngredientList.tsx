import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  CreateButton,
    Datagrid,
    ExportButton,
    List,
    NumberField,
    ReferenceField,
    TextField,
    TopToolbar,
    useDataProvider,
    useRecordContext,
} from "react-admin";
import { Link, useParams } from "react-router-dom";

const IngredientActions = ({ id, mealName }: { id: string; mealName: string }) => {
  return (
    <TopToolbar style={{ display: "contents", alignItems: "center" }}>
      <Typography variant="body1" style={{ marginRight: "auto" }}>
        <span style={{ fontWeight: "bold" }}>Meal: </span>
        <span style={{ fontStyle: "italic" }}>
          <Link to={`/meals/${id}/show`}>
            {mealName}
          </Link>
        </span>
      </Typography>
      <div>
        <CreateIngredientButton id={id} />
        <ExportButton />
      </div>
    </TopToolbar>
  );
};

const EmptyIngredient = ({ id }: { id: string }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '30em', width: '100%', paddingBottom: '11em' }}>
      <div style={{ textAlign: 'center', color: '#00000099' }}>
        <h2>No Ingredients Yet.</h2>
        <CreateIngredientButton id={id} />
      </div>
    </div>
  );
};

export const IngredientList = () => {
  const { id } = useParams();
  const [mealName, setMealName] = useState('');
  const dataProvider = useDataProvider();

  useEffect(() => {
    const fetchMealName = async () => {
      try {
        const { data } = await dataProvider.getOne('meals', { id: id });
        setMealName(data.nameEn);
      } catch (error) {
        console.error('Error fetching meal name:', error);
      }
    };

    if (id) {
      fetchMealName();
    }
  }, [dataProvider, id]);

  return (
    <>
      {id && <List resource="ingredients" filter={{ mealId: id }} actions={<IngredientActions id={id} mealName={mealName}/>} empty={<EmptyIngredient id={id}/>}> 
        <Datagrid>
          <NumberField source="code" label="Ingredient code" />
          <TextField source="name" label="Ingredient name" />
          <TextField label="Quantity" source="quantity" />
          <TextField label="Unit" source="unit" />
          <TextField label="Product keyword" source="productKeyword" />
          <ReferenceField
            source="substituteIngredientId"
            label="Primary ingredient"
            reference="ingredients"
          >
            <TextField source="name" />
          </ReferenceField>
          <TextField label="Substitute reason" source="substituteReason" />
          <EditIngredientButton />
          <MatchIngredientButton />
        </Datagrid>
      </List>}
    </>
  );
};

const CreateIngredientButton = ({ id }: { id: string }) => {
  return (
    <Button component={Link} to={`/meals/${id}/ingredients/create`}>
      Create
    </Button>
  );
};

const EditIngredientButton = () => {
  const ingredient = useRecordContext();
  return (
    <Button
      component={Link}
      to={`/meals/${ingredient.mealId}/ingredients/${ingredient.id}`}
    >
      Edit
    </Button>
  );
};

const MatchIngredientButton = () => {
  const ingredient = useRecordContext();
  return (
    <Button
      component={Link}
      to={`/meals/${ingredient.mealId}/ingredients/${ingredient.id}/match`}
    >
      Match
    </Button>
  );
}