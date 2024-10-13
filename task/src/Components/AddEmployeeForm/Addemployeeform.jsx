import React, { Fragment, useEffect } from 'react'
import { useFormik } from 'formik'
import Grid from '@mui/material/Grid2'
import {
    Button,
    Select,
    MenuItem,
    IconButton,
    FormControl,
    InputLabel,
    FormHelperText,
    Card,
    CardHeader,
    CardContent,
    Container
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { newEmployeevalidationSchema } from '../../Constant/ValidationSchemas'
import OutlinedTextField from '../../CustomComponets/TextField'
import { useSelector, useDispatch } from 'react-redux'
import { updateTableData, handleNewForm, handleEditedData, handleEditOption } from '../../Redux/AddEmployeeRedux'
import { handlePopUpForm } from '../../Redux/ShowPopRedux'
import axios from 'axios'

function Addemployeeform() {
    const { isNew, dataToEdit, isEdit } = useSelector((state) => state.addEmployeeReducer)
    const { showPopUpForm } = useSelector((state) => state.showPopUpReducer)
    const usedispatch = useDispatch()

    const handleCloseForm = () => {
        if (isEdit) {
            usedispatch(handleEditOption(false))
            usedispatch(handlePopUpForm(false))
        } else {
            usedispatch(handlePopUpForm(false))
            usedispatch(handleNewForm(false))
        }
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            location: ''
        },
        validationSchema: newEmployeevalidationSchema,
        onSubmit: async (values, { resetForm }) => {
            const url = isEdit ? `http://localhost:8081/api/employees/${dataToEdit[0].id}` : 'http://localhost:8081/api/employees' 

            try {
                if (isEdit) {
                    await axios.put(url, values) 
                    usedispatch(handleEditedData({ id: dataToEdit[0].id, values }))
                } else {
                    const response = await axios.post(url, values) 
                    const newEmployeeId = response.data.id 
                    usedispatch(updateTableData({ id: newEmployeeId, values }))
                }
                handleCloseForm()
                resetForm()
            } catch (error) {
                console.error('Error while saving employee data:', error)
            }
        },
        validateOnMount: false,
        validateOnChange: true,
    })

    useEffect(() => {
        if (isNew) {
            formik.resetForm() 
        } else if (isEdit) {
            formik.setFieldValue('name', dataToEdit[0].values.name)
            formik.setFieldValue('email', dataToEdit[0].values.email)
            formik.setFieldValue('phone', dataToEdit[0].values.phone)
            formik.setFieldValue('location', dataToEdit[0].values.location)
        }
    }, [isNew, isEdit])

    return (
        <Fragment>
            {showPopUpForm && (
                <Container maxWidth='' sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    zIndex: 1300,
                }}>
                    <Card elevation={3} sx={{ p: 5, mt: 0, maxWidth: 400 }}>
                        <Grid container>
                            <Grid size={8}>
                                <CardHeader
                                    sx={{ '& .MuiCardHeader-title': { fontSize: '20px' } }} 
                                    title={isEdit ? 'Update Employee' : 'Create Employee'} />
                            </Grid>
                            <Grid sx={{ pt: 1.5, pl: 7 }} size={4}>
                                <IconButton onClick={handleCloseForm}>
                                    <CloseIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <CardContent>
                            <Grid container spacing={1}>
                                <Grid size={12} sx={{ mt: 1 }} >
                                    <OutlinedTextField
                                        label="Name"
                                        name="name"
                                        required
                                        value={formik.values.name
                                            .trimStart()
                                            .replace(/\s\s+/g, '')
                                            .replace(/\p{Emoji_Presentation}/gu, '')}
                                        onChange={(e) => {
                                            const regx = /^[a-zA-Z ]*$/
                                            if (e.target.value === '' || regx.test(e.target.value)) {
                                                formik.handleChange(e)
                                            }
                                        }}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
                                        margin="normal"
                                        fullWidth />
                                </Grid>
                                <Grid size={12} sx={{ mt: 1 }} >
                                    <OutlinedTextField
                                        label="Email address"
                                        name="email"
                                        required
                                        value={formik.values.email
                                            .trimStart()
                                            .replace(/\s\s+/g, '')
                                            .replace(/\p{Emoji_Presentation}/gu, '')}
                                        onChange={(e) => {
                                            formik.handleChange(e)
                                        }}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                        margin="normal"
                                        fullWidth />
                                </Grid>
                                <Grid size={12} sx={{ mt: 1 }}>
                                    <OutlinedTextField
                                        label="Mobile Number"
                                        name="phone"
                                        required
                                        value={formik.values.phone
                                            .trimStart()
                                            .replace(/\s\s+/g, '')
                                            .replace(/\p{Emoji_Presentation}/gu, '')}
                                        onChange={(e) => {
                                            const regx = /^[0-9]*$/
                                            if ((e.target.value === '' || regx.test(e.target.value)) && e.target.value.length <= 10) {
                                                formik.handleChange(e)
                                            }
                                        }}
                                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                                        helperText={formik.touched.phone && formik.errors.phone}
                                        margin="normal"
                                        fullWidth />
                                </Grid>
                                <Grid size={12} >
                                    <FormControl required fullWidth sx={{ mt: 1 }} error={formik.touched.location && Boolean(formik.errors.location)}>
                                        <InputLabel id="Location-select-label">Choose Location</InputLabel>
                                        <Select
                                            name="location"
                                            labelId="Location-select-label"
                                            id="Location-select"
                                            value={formik.values.location}
                                            label="Choose Location"
                                            onChange={formik.handleChange}
                                        >
                                            <MenuItem value={"Chennai"}>Chennai</MenuItem>
                                            <MenuItem value={"Bangalore"}>Bangalore</MenuItem>
                                            <MenuItem value={"Mumbai"}>Mumbai</MenuItem>
                                            <MenuItem value={"Hyderabad"}>Hyderabad</MenuItem>
                                            <MenuItem value={"Delhi"}>Delhi</MenuItem>
                                            <MenuItem value={"Goa"}>Goa</MenuItem>
                                        </Select>
                                        {formik.touched.location && formik.errors.location && (
                                            <FormHelperText>{formik.errors.location}</FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid size={12} sx={{ mt: 2 }}>
                                    <Button fullWidth variant="contained" type='submit' onClick={formik.handleSubmit}>
                                        {isEdit ? 'Update Employee' : 'Create Employee'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Container>
            )}
        </Fragment>
    )
}

export default Addemployeeform
