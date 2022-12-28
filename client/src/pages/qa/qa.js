import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Icon } from 'react-icons-kit'
import { userO } from 'react-icons-kit/fa/userO';
import {key} from 'react-icons-kit/fa/key';
import {Accordion, Card, Button} from 'react-bootstrap';



const Qa = () => {

  return (
    <div className="m-5 p-5">
      <h3 className="mb-4">Frequently Asked Questions?</h3>
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Q.1) Write clear and concise pages.
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>In terms of FAQ pages, "the more the merrier" is actually a fallacy. Too much text can end up being too confusing, causing readers to have to search for the answer they need. Rather than writing long and eloquent paragraphs, it's best to be straightforward and brief when providing answers.</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              Q.2) Regularly update each page.
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>It's important that every FAQ page you have is always accurate. As your organization faces product launches and updates, your FAQ pages should reflect these changes as well. This means your team needs to consistently review each page and revise it after launching new features.</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="2">
              Q.3) Include a search bar.
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="2">
            <Card.Body>While it's helpful to list out all FAQ questions on a single page or link to them from a landing page, this dense format can end up being tedious for many customers. Often times, customers come to a FAQ page with a single question in mind and are forced to scroll through tens or hundreds of other questions to find theirs. If they have access to a search bar, they can easily search their question or related keywords to save time.</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="3">
              Q.4) Organize questions by category.
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="3">
            <Card.Body>What can also be tedious is listing all the questions in a random order. This is especially frustrating for customers who have several related questions regarding a single topic. Thus, it's helpful if you divide up questions into overarching topics, such as products, security, and billing.</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="4">
              Q.5) Link top questions.
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="4">
            <Card.Body>It's good to have categories laid out on the landing page of your FAQ section. However, there are likely some questions that are more popular than others. To save customers even more time, these top questions should have their own section and a link to their answer at the top of your FAQ page. That way you can maintain your categorical organization while making your most commonly asked questions more accessible.</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="5">
              Q.6) Stick to the basics.
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="5">
            <Card.Body>You might want to lighten up your FAQ pages with fun colors, themes, or humor. These can be effective based on your organization and its branding, but customers aren't on your FAQ pages to be entertained. It's typically best to stick to a basic format and simple design that can be quickly accessed and easily read.

These tips can offer you structure when crafting your own FAQ page. For more guidance in your design process, check out the following companies who created successful FAQ pages.</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
};



export default Qa;
