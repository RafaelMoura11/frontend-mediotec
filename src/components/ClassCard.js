import React from 'react';
import { Card, Button } from 'react-bootstrap';  // Importando Card e Button do react-bootstrap

const ClassCard = ({ className, year, onEdit, onDelete }) => {
    return (
        /*         <Card className="mb-4">
                    <Card.Body>
                        <div className='d-flex justify-content-between back-roxo'>
                            <Card.Title className='text-white text-uppercase'>{className}</Card.Title>
                        </div>
                        <Card.Text>{year}</Card.Text>
                        <div className="mt-3 d-flex justify-content-between">
                            <Button variant="outline-primary" onClick={onEdit}>
                                <i className="bi bi-pencil-square"></i> 
                            </Button>
        
                            <Button variant="outline-danger" onClick={onDelete}>
                                <i className="bi bi-trash"></i> 
                            </Button>
                        </div>
                    </Card.Body>
                </Card> */

        <Card className="mb-4">
            <Card.Body className="d-flex flex-column justify-content-between p-2">
                <div className="card-content text-center mb-4">
                    <Card.Title className=" mb-0">
                        {className} - {year}
                    </Card.Title>
                    <Card.Text className="class-year">{year}</Card.Text>
                </div>


                <div className="action-bar d-flex justify-content-between align-items-center p-2">
                    
                    <i className="bi bi-trash delete-icon" onClick={onDelete}></i>
                    <i className="bi bi-pencil-square edit-icon" onClick={onEdit}></i>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ClassCard;


