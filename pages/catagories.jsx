import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";
// import "sweetalert2/dist/sweetalert2.min.css";

function Catagories({ swal }) {
	const [editedCategory, setEditedCategory] = useState(null);
	const [name, setName] = useState("");
	const [categories, setCategories] = useState([]);
	const [properties, setProperties] = useState([]);
	const [parentCategory, setParentCategory] = useState("");
	useEffect(() => {
		fetchCategories();
	}, []);

	const fetchCategories = async () => {
		axios.get("/api/categories").then((res) => {
			setCategories(res.data);
		});
	};

	const saveCategory = async (e) => {
		e.preventDefault();
		const data = { name, parentCategory ,properties:properties.map(p=>({name:p.name,values:p.values.split(",")}))};
		if (editedCategory) {
			data._id = editedCategory._id;
			await axios.put(`/api/categories`, data);
			setEditedCategory(null);
		} else {
			await axios.post("/api/categories", data);
		}
		setName("");
		setParentCategory("");
		setProperties([]);
		fetchCategories();
	};


	const editCategory = async (category) => {
		setEditedCategory(category);
		setName(category.name);
		setParentCategory(category?.parent?._id);
		setProperties(category.properties.map(({name,values})=>({name,values:values.join(",")})));
	};

	const deleteCategory = async (category) => {
		swal.fire({
			title: "Are you sure?",
			text: `fo you want to to delete ${category.name} ?`,
			showCancelButton: true,
			confirmButtonText: "Yes, delete it!",
			confirmButtonColor: "#d33",
			cancelButtonText: "Cancel",
			reverseButtons: true,
			// didOpen: () => {
			// 	// run when swal is opened...
			// },
			// didClose: () => {
			// 	// run when swal is closed...
			// },
		})
			.then(async (res) => {
				// when confirmed and promise resolved...
				console.log(res);
				if (res.isConfirmed) {
					const { _id } = category;
					await axios.delete("/api/categories?_id=" + _id);
					fetchCategories();
				}
			})
			.catch((error) => {
				// when promise rejected...
			});
	};

	const addProperty = () => {
		setProperties((prev) => {
			return [...prev, { name: "", values: "" }];
		});
	};

	const handlePropertyNameChange = (idx,property,newName) => {
		setProperties((prev) => {
			const properties = [...prev];
			properties[idx].name = newName
			return properties;
		})
	}
	const handlePropertyValuesChange = (idx,property,newValues) => {
		setProperties((prev) => {
			const properties = [...prev];
			properties[idx].values = newValues
			return properties;
		})
	}

	const removeProperty = (idxToRemove) => {
		setProperties(prev => {
			return [...prev].filter((p,pIdx)=>{
				return  pIdx !== idxToRemove
			});
		});
	}

	return (
		<Layout>
			<h1> Categories </h1>
			<label htmlFor="">
				{editedCategory
					? `Edit Category ${editedCategory.name} `
					: "New CategoryName"}
			</label>
			<form onSubmit={saveCategory}>
				<div className="flex gap-1">
					<input
						type="text"
						placeholder="Category Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<select
						value={parentCategory}
						onChange={(e) => setParentCategory(e.target.value)}
					>
						<option value="">no parent category</option>

						{categories.length > 0 &&
							categories.map((category) => (
								<option value={category._id}>
									{" "}
									{/* key={category._id} */}
									{category.name}
								</option>
							))}
					</select>
				</div>
				<div className="mb-2">
					<label className="block">Properties</label>
					<button
						className="btn-default text-sm mb-2"
						type="button"
						onClick={addProperty}
					>
						add new property
					</button>
					{properties.length > 0 &&
						properties.map((property,idx) => (
							<div className="flex gap-1 mb-2">
								<input
									type="text"
									placeholder="property name (example:color)"
									value={property.name}
									className="mb-0"
									onChange={(e)=>handlePropertyNameChange(idx,property,e.target.value)}
								/>
								<input
									type="text"
									placeholder="property values comma separated"
									value={property.values}
									className="mb-0"
									onChange={(e)=>handlePropertyValuesChange(idx,property,e.target.value)}
								/>
								<button className="btn-default" onClick={()=>removeProperty(idx)} type="button">
									Remove
								</button>
							</div>
						))}
				</div>
				<div className="flex gap-1 text-lg">
				{
					editedCategory && (
						<button className="btn-default" onClick={()=> {setEditedCategory(null),setName(""), setParentCategory("") ,setProperties([]) }} type="button">
							cancel
						</button>
					)
				}

				<button type="submit" className=" btn-primary py-1">
					save
				</button>
				</div>
				
			</form>
			{
				!editedCategory &&(
					<table className="basic mt-4">
					<thead>
						<tr>
							<td>Category name</td>
							<td>Parent Category</td>
							<td></td>
						</tr>
					</thead>
					<tbody>
						{categories.length > 0 &&
							categories.map((category) => (
								<tr key={category._id}>
									<td>{category.name}</td>
									<td>{category?.parent?.name}</td>
									<td>
										<button
											className="btn-primary mr-1"
											onClick={() => editCategory(category)}
										>
											edit
										</button>
										<button
											className="btn-primary"
											onClick={() => deleteCategory(category)}
										>
											delete
										</button>
									</td>
								</tr>
							))}
					</tbody>
				</table>
				)
			}
		
		</Layout>
	);
}

// const Catagories= catagories

export default withSwal(({ swal }, ref) => <Catagories swal={swal} />);
